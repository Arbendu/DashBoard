/* ---------------------------------------------------------------------- */
/*  HeatTree.jsx                                                           */
/*  A real, area-filling treemap — like the Recharts "Bundle Size          */
/*  Treemap" reference: rectangles are sized so their AREA is exactly      */
/*  proportional to value, and together they fill 100% of the space with   */
/*  no gaps. Bigger value = visibly bigger rectangle; color is a           */
/*  continuous dark→light gradient tied to the value itself.               */
/*                                                                          */
/*  LAYOUT — `buildTreemap` (utils.js) does the actual math: a recursive   */
/*  "slice and dice" split (this is the standard treemap algorithm — the   */
/*  same idea D3/Excel/Power BI treemaps use). It returns each item's box  */
/*  as { x, y, w, h } in PERCENT of the container, which this component    */
/*  positions with `position: absolute`.                                  */
/*                                                                          */
/*  Small tiles naturally end up too small to show full text — that's      */
/*  expected treemap behavior (see the reference image: its smallest       */
/*  cells are just a color swatch, no label at all). This component        */
/*  scales down to a value-only label, then to no label, as a tile shrinks */
/*  — it never lets text force a tile wider than its assigned box (that    */
/*  was the earlier overflow bug — `minWidth: 0` + `overflow: hidden`      */
/*  below are what actually prevent it, keep both on any tile).            */
/* ---------------------------------------------------------------------- */

import React, { useMemo, useState } from "react";
import { Box, Stack, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Inventory2RoundedIcon from "@mui/icons-material/Inventory2Rounded";
import { GlassPanel, PanelHeader, MiniSelect, RADIUS, textSecondarySx } from "./common";
import { heatColor, mixHex, getColor, buildTreemap, formatAmount } from "./utils";

/** A single treemap cell, positioned by percent within the container. */
function Tile({ item, x, y, w, h, color, shareLabel, onClick }) {
  const theme = useTheme();
  const fg = theme.palette.getContrastText(color);
  const sheen = mixHex(color, "#ffffff", 0.16);

  // Tiny tiles can't fit a name + amount + share line — the reference
  // treemap just shows a bare color swatch for its smallest cells, so we
  // follow the same pattern instead of forcing text to overflow.
  const showFull = w >= 14 && h >= 16;
  const showValueOnly = !showFull && w >= 7 && h >= 9;

  return (
    <Box
      sx={{
        position: "absolute",
        left: `${x}%`,
        top: `${y}%`,
        width: `${w}%`,
        height: `${h}%`,
        p: 0.25, // thin gap between tiles, matching the reference's grid look
        boxSizing: "border-box",
      }}
    >
      <Box
        role={onClick ? "button" : undefined}
        tabIndex={onClick ? 0 : undefined}
        onClick={onClick}
        sx={{
          width: "100%",
          height: "100%",
          minWidth: 0, // prevents un-wrapped text from forcing this box wider than its %
          minHeight: 0,
          borderRadius: RADIUS.sm,
          p: showFull ? 1.25 : 0.75,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          overflow: "hidden", // hard clip — a tile can never visually escape its assigned box
          cursor: onClick ? "pointer" : "default",
          background: `linear-gradient(135deg, ${sheen} 0%, ${color} 55%)`,
          color: fg,
          transition: "transform 0.15s ease, box-shadow 0.15s ease",
          "&:hover": { transform: "scale(1.015)", boxShadow: theme.shadows[6], zIndex: 1 },
        }}
      >
        {showFull && (
          <Typography sx={{ fontFamily: theme.typography.fontFamily, fontSize: 13, fontWeight: 600, opacity: 0.92, lineHeight: 1.25 }} noWrap>
            {item.name}
          </Typography>
        )}
        {(showFull || showValueOnly) && (
          <Box sx={{ minWidth: 0 }}>
            <Typography
              sx={{ fontFamily: theme.typography.fontFamily, fontSize: showFull ? 18 : 11, fontWeight: 700, lineHeight: 1.2 }}
              noWrap
            >
              {formatAmount(item.value)}
            </Typography>
            {showFull && (
              <Typography sx={{ fontFamily: theme.typography.fontFamily, fontSize: 11, opacity: 0.82, mt: 0.25 }}>
                {item.share}% {shareLabel}
              </Typography>
            )}
          </Box>
        )}
      </Box>
    </Box>
  );
}

/** Color-dot + label legend row, wraps cleanly regardless of item count. */
function Legend({ items, colorFor }) {
  const theme = useTheme();
  return (
    <Box sx={{ mt: 2, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(136px, 1fr))", rowGap: 0.85, columnGap: 1.5 }}>
      {items.map((l, i) => (
        <Stack key={l.name} direction="row" spacing={0.75} alignItems="center">
          <Box sx={{ width: 8, height: 8, borderRadius: "2px", bgcolor: colorFor ? colorFor(l.name) : getColor(l.name, i, theme), flexShrink: 0 }} />
          <Typography sx={{ ...textSecondarySx, fontSize: 11.5, fontWeight: 500 }} noWrap>
            {l.name}
          </Typography>
        </Stack>
      ))}
    </Box>
  );
}

/**
 * Props:
 *  - config: { title, subtitle, items: {name, value, share, type}[], legend: {name}[],
 *              filterOptions?: string[], activeFilter?: string }
 *    Each item's `type` drives the filter dropdown below — `filterOptions[0]`
 *    is treated as "show everything"; any other option filters items down
 *    to `item.type === selectedOption`.
 *  - icon: MUI icon component for the panel header
 *  - gradientDark / gradientLight: hex strings, this section's gradient
 *    endpoints (e.g. navy→sky for deposits, purple→lavender for loans)
 *  - shareLabel: string appended after each tile's percentage, e.g.
 *    "of deposits" / "of loans"
 *  - onTileClick: optional (item) => void. Tiles are display-only (just a
 *    hover lift) unless this is provided.
 *  - panelId / selectedPanel / onSelectPanel: optional click-to-highlight
 *    wiring, shared with every other panel (see GlassPanel in common.jsx).
 */
export default function HeatTree({
  config,
  icon = Inventory2RoundedIcon,
  gradientDark,
  gradientLight,
  shareLabel = "of total",
  onTileClick,
  panelId,
  selectedPanel,
  onSelectPanel,
}) {
  const hasFilter = Array.isArray(config.filterOptions) && config.filterOptions.length > 1;
  const [filter, setFilter] = useState(config.activeFilter || (hasFilter ? config.filterOptions[0] : undefined));
  const showAll = !hasFilter || filter === config.filterOptions[0];

  const items = useMemo(() => {
    if (showAll) return config.items;
    return config.items.filter((it) => it.type === filter);
  }, [config.items, filter, showAll]);

  const legend = useMemo(() => {
    if (showAll) return config.legend;
    const names = new Set(items.map((it) => it.name));
    return config.legend.filter((l) => names.has(l.name));
  }, [config.legend, showAll, items]);

  const colorFor = useMemo(() => {
    const values = items.map((it) => it.value);
    const minValue = values.length ? Math.min(...values) : 0;
    const maxValue = values.length ? Math.max(...values) : 0;
    return (value) => heatColor(value, minValue, maxValue, gradientDark, gradientLight);
  }, [items, gradientDark, gradientLight]);

  // Legend needs a color BY NAME (it doesn't have each item's value handy),
  // so look the real value up before calling colorFor.
  const legendColorFor = useMemo(() => {
    const byName = new Map(items.map((it) => [it.name, it.value]));
    return (name) => (byName.has(name) ? colorFor(byName.get(name)) : undefined);
  }, [items, colorFor]);

  // Largest → smallest so the biggest rectangle reliably lands in a
  // corner (matching the reference image's layout), and so the split
  // algorithm groups similarly-sized items together.
  const sortedItems = useMemo(() => [...items].sort((a, b) => b.value - a.value), [items]);

  const layout = useMemo(() => buildTreemap(sortedItems, 0, 0, 100, 100, true), [sortedItems]);

  return (
    <GlassPanel selected={selectedPanel === panelId} onClick={() => onSelectPanel?.(panelId)}>
      <PanelHeader
        icon={icon}
        title={config.title}
        action={hasFilter ? <MiniSelect options={config.filterOptions} value={filter} onChange={setFilter} /> : undefined}
      />
      {config.subtitle && (
        <Typography sx={{ ...textSecondarySx, fontSize: 12.5, mt: -1.5, mb: 1.5 }}>{config.subtitle}</Typography>
      )}

      {/* Fixed-height frame the treemap fills exactly — overflow: hidden is
          a hard safety net so a tile can never visually spill past the
          card even in an edge case. */}
      <Box sx={{ position: "relative", width: "100%", height: { xs: 320, sm: 360, md: 400 }, overflow: "hidden" }}>
        {layout.map(({ item, x, y, w, h }) => (
          <Tile
            key={item.name}
            item={item}
            x={x}
            y={y}
            w={w}
            h={h}
            color={colorFor(item.value)}
            shareLabel={shareLabel}
            onClick={onTileClick ? () => onTileClick(item) : undefined}
          />
        ))}
      </Box>

      <Legend items={legend} colorFor={legendColorFor} />
    </GlassPanel>
  );
}

