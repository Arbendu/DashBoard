// Response 
{
    "data": {
        "staticDashboardData": [
            {
                "casaratio": {
                    "activeFilter": null,
                    "data": [
                        {
                            "casaValue": "Below 30%",
                            "name": "Below",
                            "type": null,
                            "value": null
                        },
                        {
                            "casaValue": "30% – 50%",
                            "name": "Mid",
                            "type": null,
                            "value": null
                        },
                        {
                            "casaValue": "Above 50%",
                            "name": "Above",
                            "type": null,
                            "value": null
                        }
                    ],
                    "filterOptions": null,
                    "key": "casaratio",
                    "subtitle": "Current portfolio mix",
                    "title": "CASA Ratio",
                    "value": 0.14039408866995073
                },
                "deposits": {
                    "activeFilter": "All Deposit",
                    "data": [
                        {
                            "casaValue": null,
                            "name": "Certificate of Deposit ",
                            "type": "Time Deposit",
                            "value": 64.0
                        },
                        {
                            "casaValue": null,
                            "name": "Other Term Deposit ",
                            "type": "Time Deposit",
                            "value": 27.0
                        },
                        {
                            "casaValue": null,
                            "name": "Special Term Deposit ",
                            "type": "Time Deposit",
                            "value": 91.0
                        },
                        {
                            "casaValue": null,
                            "name": "term deposit ",
                            "type": "Time Deposit",
                            "value": 56.0
                        },
                        {
                            "casaValue": null,
                            "name": "Cash Credit Cr Balance",
                            "type": "Demand Deposit",
                            "value": 78.0
                        },
                        {
                            "casaValue": null,
                            "name": "Saving Bank A/c",
                            "type": "Demand Deposit",
                            "value": 45.0
                        },
                        {
                            "casaValue": null,
                            "name": "Current A/c",
                            "type": "Demand Deposit",
                            "value": 12.0
                        },
                        {
                            "casaValue": null,
                            "name": "Other Demand Deposit ",
                            "type": "Demand Deposit",
                            "value": 33.0
                        }
                    ],
                    "filterOptions": [
                        "All Deposit",
                        "Demand Deposit",
                        "Time Deposit"
                    ],
                    "key": "deposits",
                    "subtitle": "Composition by category (₹ T)",
                    "title": "Deposits",
                    "value": null
                },
                "demanddeposits": {
                    "activeFilter": null,
                    "data": [
                        {
                            "casaValue": null,
                            "name": "Cash Credit Cr Balance",
                            "type": "Demand Deposit",
                            "value": 78.0
                        },
                        {
                            "casaValue": null,
                            "name": "Saving Bank A/c",
                            "type": "Demand Deposit",
                            "value": 45.0
                        },
                        {
                            "casaValue": null,
                            "name": "Current A/c",
                            "type": "Demand Deposit",
                            "value": 12.0
                        },
                        {
                            "casaValue": null,
                            "name": "Other Demand Deposit ",
                            "type": "Demand Deposit",
                            "value": 33.0
                        }
                    ],
                    "filterOptions": null,
                    "key": "demanddeposits",
                    "subtitle": null,
                    "title": "Demand Deposits",
                    "value": null
                },
                "timedeposits": {
                    "activeFilter": null,
                    "data": [
                        {
                            "casaValue": null,
                            "name": "Certificate of Deposit ",
                            "type": "Time Deposit",
                            "value": 64.0
                        },
                        {
                            "casaValue": null,
                            "name": "Other Term Deposit ",
                            "type": "Time Deposit",
                            "value": 27.0
                        },
                        {
                            "casaValue": null,
                            "name": "Special Term Deposit ",
                            "type": "Time Deposit",
                            "value": 91.0
                        },
                        {
                            "casaValue": null,
                            "name": "term deposit ",
                            "type": "Time Deposit",
                            "value": 56.0
                        }
                    ],
                    "filterOptions": null,
                    "key": "timedeposits",
                    "subtitle": null,
                    "title": "Time Deposits",
                    "value": null
                },
                "loans": {
                    "activeFilter": "All Loans",
                    "data": [
                        {
                            "casaValue": null,
                            "name": "Term Loan Account",
                            "type": "Loan",
                            "value": 28.0
                        },
                        {
                            "casaValue": null,
                            "name": "Agri Cash Credit ",
                            "type": "Loan",
                            "value": 55.0
                        },
                        {
                            "casaValue": null,
                            "name": "Cash Credit ",
                            "type": "Loan",
                            "value": 41.0
                        },
                        {
                            "casaValue": null,
                            "name": "Demand Loan ",
                            "type": "Loan",
                            "value": 82.0
                        },
                        {
                            "casaValue": null,
                            "name": "Overdraft ",
                            "type": "Loan",
                            "value": 73.0
                        },
                        {
                            "casaValue": null,
                            "name": "Bills Payable ",
                            "type": "Loan",
                            "value": 19.0
                        }
                    ],
                    "filterOptions": [
                        "All Loans"
                    ],
                    "key": "loans",
                    "subtitle": "Loans by category",
                    "title": "Loans",
                    "value": null
                }
            }
        ]
    },
    "message": "Frequency stats loaded",
    "success": true,
    "timestamp": "2026-09-11T07:05:07.955273300Z"
}







// BarChart

/* ---------------------------------------------------------------------- */
/*  BarChart.jsx                                                           */
/*  REUSABLE: the ONE place the Recharts bar-chart markup lives. Every     */
/*  bar panel in the dashboard (Demand Deposits, Term Deposits, Loan       */
/*  Distribution, and every drill-down) renders through this with         */
/*  different `data` passed in — nothing is duplicated per section.       */
/*                                                                          */
/*  ChartTooltip lives here too: it's only ever used by this chart, so a   */
/*  separate file for a 20-line component just added another place to     */
/*  look for something that's really part of this one piece.              */
/* ---------------------------------------------------------------------- */

import React from "react";
import { Box, Typography } from "@mui/material";
import { alpha, useTheme } from "@mui/material/styles";
import {
  Bar,
  BarChart as RechartsBarChart, // aliased so it doesn't clash with our own component name below
  CartesianGrid,
  Cell,
  LabelList,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { glass } from "../../theme/themePrimitives"; // adjust path to match your project structure
import { RADIUS } from "./Common";
import { getColor, formatAmount } from "./Utils";

/** Custom Recharts tooltip content — a small frosted card matching the
 * rest of the dashboard, in place of Recharts' unstyled default. Reads the
 * swatch color straight off the hovered data point (`__color`), with a
 * same-index fallback if it's absent. */
function ChartTooltip({ active, payload, label, theme }) {
  if (!active || !payload || !payload.length) return null;
  const value = payload[0].value;
  const color = payload[0].payload?.__color || getColor(label, 0, theme);

  return (
    <Box
      sx={{
        background: glass.panel(0.92),
        backdropFilter: "blur(16px) saturate(160%)",
        border: `1px solid ${glass.border}`,
        borderRadius: RADIUS.sm,
        px: 1.5,
        py: 1,
        boxShadow: theme.shadows[8],
      }}
    >
      <Typography sx={{ fontSize: 11.5, fontWeight: 600, color: "text.secondary" }}>{label}</Typography>
      <Typography sx={{ fontSize: 14, fontWeight: 800, color }}>{formatAmount(value)}</Typography>
    </Box>
  );
}

/**
 * Renders a { name, value, __color }[] dataset as a bar chart.
 *
 * Props:
 *  - data: { name: string, value: number, __color: string }[]
 *    `__color` should already be resolved (see utils.getColor) by whoever
 *    builds this array — this component doesn't know what a "deposit" is.
 *  - onBarClick: optional (item) => void. When provided, bars become
 *    clickable (drill-down); when omitted, bars are display-only.
 */
export default function BarChart({ data, onBarClick }) {
  const theme = useTheme();
  const gridStrokeColor = alpha(theme.palette.text.primary, 0.08);
  const longLabels = data.length > 5;

  return (
    <Box
      sx={{
        width: "100%",
        height: longLabels ? 320 : 270,
        // Recharts marks chart elements focusable for accessibility; without
        // this, clicking a bar leaves a default browser focus outline behind.
        "& svg:focus, & svg *:focus": { outline: "none" },
      }}
    >
      <ResponsiveContainer>
        <RechartsBarChart data={data} margin={{ top: 28, right: 16, left: -4, bottom: longLabels ? 70 : 6 }} barCategoryGap="32%">
          <CartesianGrid vertical={false} stroke={gridStrokeColor} strokeDasharray="3 5" />
          <XAxis
            dataKey="name"
            tick={{ fontSize: longLabels ? 9.5 : 10.5, fill: theme.palette.text.secondary }}
            axisLine={{ stroke: gridStrokeColor }}
            tickLine={false}
            interval={0}
            angle={longLabels ? -35 : 0}
            textAnchor={longLabels ? "end" : "middle"}
            height={longLabels ? 70 : 30}
          />
          <YAxis tick={{ fontSize: 11, fill: theme.palette.text.secondary }} axisLine={false} tickLine={false} width={32} />
          <Tooltip cursor={{ fill: alpha(theme.palette.text.primary, 0.05) }} content={(props) => <ChartTooltip {...props} theme={theme} />} />
          <Bar dataKey="value" radius={[7, 7, 0, 0]} maxBarSize={48}>
            {data.map((d) => (
              <Cell
                key={d.name}
                fill={d.__color}
                cursor={onBarClick ? "pointer" : "default"}
                onClick={
                  onBarClick
                    ? (e) => {
                        e.stopPropagation(); // keep bar-click separate from any panel-level click handler
                        onBarClick(d);
                      }
                    : undefined
                }
              />
            ))}
            <LabelList
              dataKey="value"
              position="top"
              formatter={(v) => formatAmount(v)}
              style={{ fontSize: 11, fontWeight: 700, fill: theme.palette.text.primary }}
            />
          </Bar>
        </RechartsBarChart>
      </ResponsiveContainer>
    </Box>
  );
}







// BarPanel

/* ---------------------------------------------------------------------- */
/*  BarPanel.jsx                                                           */
/*  REUSABLE: one panel type, used for every bar-chart section in the      */
/*  dashboard (Demand Deposits, Term Deposits, Loan Distribution) — only   */
/*  `config`, `icon`, and `titleOverride` differ per call.                 */
/*                                                                          */
/*  DrilldownBarChart lives in this same file: it's the view BarPanel      */
/*  swaps to when a bar is clicked, and nothing else ever renders it, so   */
/*  keeping them apart didn't add clarity — just an extra file to open.    */
/* ---------------------------------------------------------------------- */

import React, { useMemo, useState } from "react";
import { Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { GlassPanel, PanelHeader, MiniSelect, BackButton, textSecondarySx } from "./Common";
import BarChart from "./BarChart";
import { getColor } from "./Utils";

/** Renders a drill-down view: a title, optional subtitle, a "Back" button,
 * and a bar chart for whatever { title, subtitle, data } it's handed.
 * Knows nothing about deposits/loans specifically. */
function DrilldownBarChart({ icon, config, onBack }) {
  const theme = useTheme();
  const chartData = useMemo(
    () => config.data.map((d, i) => ({ ...d, __color: getColor(d.name, i, theme) })),
    [config.data, theme]
  );

  return (
    <>
      <PanelHeader icon={icon} title={config.title} action={<BackButton onBack={onBack} />} />
      {config.subtitle && (
        <Typography sx={{ ...textSecondarySx, fontSize: 12.5, mt: -1.5, mb: 1.5 }}>{config.subtitle}</Typography>
      )}
      <BarChart data={chartData} />
    </>
  );
}

/**
 * Props:
 *  - config: { title, topValue?, data: {name, value}[], dropdownOptions?, activeOption? }
 *  - icon: MUI icon component for the panel header
 *  - titleOverride: optional string shown instead of config.title (two
 *    configs can share a generic title, e.g. two "Loans" sources)
 *  - fetchDrilldown: (categoryName: string) => Promise<{title, subtitle, data} | null>
 *    Injected as a prop, not imported, so this component has no hardcoded
 *    dependency on a specific data-fetching module — swap it for a real
 *    API call wherever BarPanel is used. Omit it to disable drill-down.
 *  - panelId / selectedPanel / onSelectPanel: optional click-to-highlight
 *    wiring, shared with every other panel (see GlassPanel in common.jsx).
 */
export default function BarPanel({ icon, config, titleOverride, fetchDrilldown, panelId, selectedPanel, onSelectPanel }) {
  const theme = useTheme();
  const hasDropdown = Array.isArray(config.dropdownOptions) && config.dropdownOptions.length > 0;
  const [option, setOption] = useState(config.activeOption || (hasDropdown ? config.dropdownOptions[0] : undefined));
  const [drilldown, setDrilldown] = useState(null); // { title, subtitle, data } | null

  const chartData = useMemo(
    () => config.data.map((d, i) => ({ ...d, __color: getColor(d.name, i, theme) })),
    [config.data, theme]
  );

  const handleBarClick = (item) => {
    if (!fetchDrilldown) return;
    fetchDrilldown(item.name).then((result) => {
      if (result) setDrilldown(result);
    });
  };

  if (drilldown) {
    return (
      <GlassPanel sx={{ p: 3 }}>
        <DrilldownBarChart icon={icon} config={drilldown} onBack={() => setDrilldown(null)} />
      </GlassPanel>
    );
  }

  return (
    <GlassPanel sx={{ p: 3 }} selected={selectedPanel === panelId} onClick={() => onSelectPanel?.(panelId)}>
      <PanelHeader
        icon={icon}
        title={titleOverride || config.title}
        action={hasDropdown ? <MiniSelect options={config.dropdownOptions} value={option} onChange={setOption} /> : undefined}
      />
      {config.topValue && (
        <Typography sx={{ ...textSecondarySx, fontSize: 12.5, mt: -1.5, mb: 2 }}>
          Largest category: <b>{config.topValue}</b>
        </Typography>
      )}
      <BarChart data={chartData} onBarClick={fetchDrilldown ? handleBarClick : undefined} />
    </GlassPanel>
  );
}






// Common

/* ---------------------------------------------------------------------- */
/*  common.jsx — small, chart-agnostic building blocks                     */
/*  GlassPanel, PanelHeader, MiniSelect, SectionHeader, BackButton, plus    */
/*  shared style tokens. The actual page (API call, loading/error states,  */
/*  renders <DepositsLoansDashboard />) is DashboardPage.jsx.              */
/*  Every panel/chart component imports one or more of these. Grouped in   */
/*  one file on purpose: each one is 10-30 lines, and splitting them into  */
/*  separate files just made them harder to find without cutting any       */
/*  real complexity.                                                      */
/* ---------------------------------------------------------------------- */

import React from "react";
import { Box, Button, MenuItem, Paper, Select, Stack, Typography } from "@mui/material";
import { alpha, useTheme } from "@mui/material/styles";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import { glass } from "../../theme/themePrimitives"; // adjust path to match your project structure

/* ---- style tokens ------------------------------------------------------ */

export const textPrimarySx = { color: "text.primary" };
export const textSecondarySx = { color: "text.secondary" };
export const RADIUS = { lg: "20px", md: "16px", sm: "12px" };

/* ---- GlassPanel ---------------------------------------------------------
 * Shared card surface every panel sits on.
 * Props: selected (bool, reserved for a click-to-highlight state),
 *        onClick (fn, makes the whole panel clickable), sx (overrides). */

export function GlassPanel({ children, sx, selected, onClick, ...props }) {
  const theme = useTheme();

  return (
    <Paper
      elevation={0}
      onClick={onClick}
      sx={{
        p: 2.5,
        borderRadius: RADIUS.lg,
        height: "100%",
        background: `linear-gradient(160deg, ${glass.panel(0.6)} 0%, ${glass.panel(0.38)} 100%)`,
        backdropFilter: "blur(24px) saturate(160%)",
        WebkitBackdropFilter: "blur(24px) saturate(160%)",
        border: `1px solid ${glass.border}`,
        boxShadow: theme.shadows[6],
        cursor: onClick ? "pointer" : "default",
        transition: "box-shadow 0.25s ease, transform 0.25s ease, border-color 0.2s ease",
        ...sx,
      }}
      {...props}
    >
      {children}
    </Paper>
  );
}

/* ---- PanelHeader ---------------------------------------------------------
 * Icon chip + title + right-aligned action slot, used by every panel.
 * Props: icon (MUI icon component), title (string), action (node), iconColor. */

export function PanelHeader({ icon: Icon, title, action, iconColor }) {
  const theme = useTheme();
  const color = iconColor || theme.palette.primary.main;

  return (
    <Stack direction="row" alignItems="center" justifyContent="space-between" flexWrap="wrap" rowGap={1} sx={{ mb: 2 }}>
      <Stack direction="row" alignItems="center" spacing={1.25}>
        {Icon && (
          <Box
            sx={{
              width: 36,
              height: 36,
              borderRadius: RADIUS.sm,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              bgcolor: alpha(color, 0.14),
              color,
              flexShrink: 0,
            }}
          >
            <Icon sx={{ fontSize: 19 }} />
          </Box>
        )}
        <Typography sx={{ ...textPrimarySx, fontWeight: 700, fontSize: 15, letterSpacing: 0.1 }}>
          {title}
        </Typography>
      </Stack>
      {action}
    </Stack>
  );
}

/* ---- MiniSelect -----------------------------------------------------------
 * Small pill dropdown, reused for every filter/option control.
 * Props: options (string[]), value (string), onChange (fn). */

export function MiniSelect({ options, value, onChange }) {
  const theme = useTheme();

  return (
    <Select
      size="small"
      value={value}
      onClick={(e) => e.stopPropagation()}
      onChange={(e) => onChange(e.target.value)}
      sx={{
        ...textPrimarySx,
        fontSize: 13,
        fontWeight: 600,
        borderRadius: RADIUS.sm,
        background: glass.panel(0.5),
        backdropFilter: "blur(12px) saturate(160%)",
        "& .MuiOutlinedInput-notchedOutline": { border: `1px solid ${glass.border}` },
        "& .MuiSelect-select": { py: 0.75, pr: 4 },
      }}
    >
      {options.map((opt) => (
        <MenuItem key={opt} value={opt} sx={{ fontSize: 13, fontFamily: theme.typography.fontFamily }}>
          {opt}
        </MenuItem>
      ))}
    </Select>
  );
}

/* ---- SectionHeader ---------------------------------------------------------
 * Slim accent + title + caption + fading rule, introduces a group of panels.
 * Props: title (string), caption (optional string). */

export function SectionHeader({ title, caption }) {
  const theme = useTheme();

  return (
    <Stack direction="row" alignItems="center" spacing={1.25} sx={{ mt: 1.5, pl: 0.25 }}>
      <Box sx={{ width: 4, height: 22, borderRadius: "999px", bgcolor: theme.palette.primary.main, flexShrink: 0 }} />
      <Box sx={{ minWidth: 0 }}>
        <Typography sx={{ ...textPrimarySx, fontSize: { xs: 15, md: 16.5 }, fontWeight: 600, lineHeight: 1.3 }}>
          {title}
        </Typography>
        {caption && (
          <Typography sx={{ ...textSecondarySx, fontSize: 11.5, fontWeight: 500 }}>{caption}</Typography>
        )}
      </Box>
      <Box
        sx={{
          flex: 1,
          height: "1px",
          ml: 1,
          background: `linear-gradient(90deg, ${alpha(theme.palette.text.primary, 0.12)}, transparent)`,
          display: { xs: "none", sm: "block" },
        }}
      />
    </Stack>
  );
}

/* ---- BackButton -----------------------------------------------------------
 * "Back" pill used to leave a drill-down. Purely presentational.
 * Props: onBack (fn). */

export function BackButton({ onBack }) {
  const theme = useTheme();

  return (
    <Button
      size="small"
      onClick={(e) => {
        e.stopPropagation();
        onBack();
      }}
      startIcon={<ArrowBackRoundedIcon sx={{ fontSize: 16 }} />}
      sx={{
        textTransform: "none",
        fontWeight: 700,
        fontSize: 12.5,
        borderRadius: RADIUS.sm,
        color: theme.palette.primary.main,
        bgcolor: alpha(theme.palette.primary.main, 0.1),
        "&:hover": { bgcolor: alpha(theme.palette.primary.main, 0.18) },
      }}
    >
      Back
    </Button>
  );
}







// DashboardPage.jsx

/* ---------------------------------------------------------------------- */
/*  DashboardPage.jsx — main entry point / the ONE place the real API      */
/*  gets wired in.                                                        */
/*  Uses the project's existing `useApi` hook to fetch the dashboard data  */
/*  once on mount, maps the raw response into the shape                    */
/*  <DepositsLoansDashboard /> expects (mapApiToDashboardData.js), and     */
/*  handles loading / error / empty states. No component under             */
/*  DepositsLoansDashboard knows an API exists — this is the only file     */
/*  that needs to change if the endpoint, auth, or response shape changes. */
/*  Mount this file directly as your route/page component.                */
/* ---------------------------------------------------------------------- */

import React, { useEffect, useMemo } from "react";
import { Box, Button, CircularProgress, Typography } from "@mui/material";
import useApi from "../../hooks/useApi"; // adjust path to match your project structure
import DepositsLoansDashboard from "./DepositsLoansDashboard";
import mapApiToDashboardData from "./MapApiToDashboardData";
import { textSecondarySx } from "./Common";

const DASHBOARD_ENDPOINT = "/DS/dashboard/getdashboarddata";

export default function DashboardPage() {
  const { data: apiResponse, error, loading, callApi } = useApi();

  useEffect(() => {
    callApi(DASHBOARD_ENDPOINT).catch(() => {
      // Swallow here — `error` from useApi already captures it below, and
      // callApi's own catch already logs the underlying error.
    });
    // Only fetch once on mount.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // The actual dashboard content is nested one level in:
  // response.data.staticDashboardData[0]. mapApiToDashboardData does all
  // the shape translation + derived calculations (share %, topValue, ...).
  const dashboardData = useMemo(() => {
    const section = apiResponse?.data?.staticDashboardData?.[0];
    return mapApiToDashboardData(section);
  }, [apiResponse]);

  if (loading && !dashboardData) {
    return (
      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "60vh", gap: 2 }}>
        <CircularProgress />
        <Typography sx={textSecondarySx}>Loading dashboard…</Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "60vh", gap: 2, textAlign: "center", px: 3 }}>
        <Typography sx={{ fontWeight: 700 }}>Couldn't load the dashboard</Typography>
        <Typography sx={textSecondarySx}>
          {error?.response?.data?.message || error?.message || "Something went wrong while fetching data."}
        </Typography>
        <Button variant="contained" onClick={() => callApi(DASHBOARD_ENDPOINT)}>
          Retry
        </Button>
      </Box>
    );
  }

  if (!dashboardData) {
    return (
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "60vh" }}>
        <Typography sx={textSecondarySx}>No dashboard data available.</Typography>
      </Box>
    );
  }

  // No `fetchDrilldown` passed — there's currently no drill-down endpoint,
  // so every bar renders display-only until one exists (see BarPanel.jsx).
  return <DepositsLoansDashboard data={dashboardData} />;
}






// DepositsLoansDashboard

/* ---------------------------------------------------------------------- */
/*  DepositsLoansDashboard.jsx — root component                            */
/*  Purely presentational/compositional. Every number on screen comes      */
/*  from the `data` prop, every drill-down from `fetchDrilldown`. Nothing  */
/*  is imported or hardcoded here — see DashboardPage.jsx for how the real */
/*  API's response gets mapped into this shape (mapApiToDashboardData.js). */
/*                                                                          */
/*  NOTE: the Loans section has been removed — the current API response    */
/*  has no loans data. Re-add a second <HeatTree> + <BarPanel> pair (see    */
/*  git history / the previous version of this file) once that data        */
/*  exists; nothing else needs to change.                                 */
/* ---------------------------------------------------------------------- */

import React, { useState } from "react";
import { Box, Stack, Typography } from "@mui/material";
import AccountBalanceRoundedIcon from "@mui/icons-material/AccountBalanceRounded";
import DescriptionRoundedIcon from "@mui/icons-material/DescriptionRounded";
import { SectionHeader, textPrimarySx, textSecondarySx } from "./Common";
import HeatTree from "./HeatTree";
import Gauge from "./Gauge";
import BarPanel from "./BarPanel";

/** Page title/subtitle. Only used once, kept inline rather than as its
 * own file. */
function DashboardHeader({ config }) {
  return (
    <Stack direction={{ xs: "column", lg: "row" }} alignItems={{ xs: "flex-start", lg: "center" }} justifyContent="space-between" spacing={2} sx={{ px: 0.5 }}>
      <Box>
        <Typography sx={{ ...textPrimarySx, fontSize: { xs: 20, md: 24 }, fontWeight: 700 }}>{config.title}</Typography>
        {config.subtitle && <Typography sx={{ ...textSecondarySx, fontSize: 13, mt: 0.25 }}>{config.subtitle}</Typography>}
      </Box>
    </Stack>
  );
}

/**
 * Props:
 *  - data: {
 *      header: { title, subtitle },
 *      casaGauge: { title, subtitle, value: number | null, centerLabel },
 *      depositsComposition: {
 *        title, subtitle,
 *        items: { name, value, share, type }[],
 *        legend: { name }[],
 *        filterOptions?: string[], activeFilter?: string,
 *      },
 *      demandDeposits: { title, topValue, data: { name, value }[] },
 *      termDeposits:   { title, topValue, data: { name, value }[] },
 *    }
 *  - fetchDrilldown: optional (categoryName: string) => Promise<{title, subtitle, data} | null>
 *    Passed straight through to every BarPanel. Omit it to make every bar
 *    chart purely display-only (no drill-down) — there's currently no
 *    drill-down endpoint, so callers should omit this for now.
 */
export default function DepositsLoansDashboard({ data, fetchDrilldown }) {
  const [selectedPanel, setSelectedPanel] = useState(null);

  if (!data) return null;

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5, minHeight: "100vh" }}>
     
      <HeatTree
        config={data.depositsComposition}
        icon={AccountBalanceRoundedIcon}
        gradientDark="#123a63"
        gradientLight="#7dd3fc"
        shareLabel="of deposits"
        panelId="deposits-treemap"
        selectedPanel={selectedPanel}
        onSelectPanel={setSelectedPanel}
      />

      <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "1fr 1fr", lg: "1fr 1fr 1fr" }, gap: 2.5 }}>
        <Gauge config={data.casaGauge} panelId="casa-gauge" selectedPanel={selectedPanel} onSelectPanel={setSelectedPanel} />
        <BarPanel
          icon={DescriptionRoundedIcon}
          config={data.demandDeposits}
          fetchDrilldown={fetchDrilldown}
          panelId="demand-deposits-bar"
          selectedPanel={selectedPanel}
          onSelectPanel={setSelectedPanel}
        />
        <BarPanel
          icon={DescriptionRoundedIcon}
          config={data.termDeposits}
          fetchDrilldown={fetchDrilldown}
          panelId="term-deposits-bar"
          selectedPanel={selectedPanel}
          onSelectPanel={setSelectedPanel}
        />
      </Box>
    </Box>
  );
}






// Gauge.jsx

/* ---------------------------------------------------------------------- */
/*  Gauge.jsx                                                              */
/*  Semi-donut gauge with a value-driven needle, used for the CASA Ratio.  */
/*  Status bands are a fixed red/amber/green — a "traffic light" read      */
/*  rather than category colors — and the needle angle comes directly     */
/*  from `config.value`, so it always points exactly where the number      */
/*  says.                                                                  */
/*                                                                          */
/*  The gauge box is a fixed SQUARE on purpose: the needle is a plain SVG  */
/*  overlay using a 300×300 coordinate system, which only lines up with    */
/*  the Pie underneath it when the container is square.                   */
/* ---------------------------------------------------------------------- */

import React from "react";
import { Box, Stack, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";
import PieChartRoundedIcon from "@mui/icons-material/PieChartRounded";
import { GlassPanel, PanelHeader, textSecondarySx } from "./Common";

// Fixed thresholds, pulled out as constants (not inline) so they're easy
// to move to config/props later if different ratios need different bands.
const STATUS_BANDS = [
  { name: "Below 35%", width: 33.3, key: "low" },
  { name: "35% – 65%", width: 33.3, key: "mid" },
  { name: "Above 65%", width: 33.3, key: "high" },
];

function statusFor(value) {
  if (value < 35) return "low";
  if (value <= 65) return "mid";
  return "high";
}

/**
 * Props:
 *  - config: { title, subtitle, value, centerLabel }
 *  - panelId / selectedPanel / onSelectPanel: optional click-to-highlight
 *    wiring, shared with every other panel (see GlassPanel in common.jsx).
 */
export default function Gauge({ config, panelId, selectedPanel, onSelectPanel }) {
  const theme = useTheme();
  const RADIAN = Math.PI / 180;
  const VIEWBOX = 300;
  const cx = VIEWBOX * 0.5; // matches the Pie's cx="50%"
  const cy = VIEWBOX * 0.85; // matches the Pie's cy="85%" — NOT cx/cy * 0.85
  const innerR = 95;
  const GAUGE_SIZE = 280; // fixed + square — see note above

  // The API can return casaGauge.value as null (not populated yet). Render
  // an explicit "not available" state instead of NaN math / a broken needle.
  const hasValue = typeof config.value === "number" && !Number.isNaN(config.value);

  const statusColor = {
    low: theme.palette.error.main,
    mid: theme.palette.warning.main,
    high: theme.palette.success.main,
  };
  const bandData = STATUS_BANDS.map((b) => ({ name: b.name, value: b.width }));
  const currentStatus = hasValue ? statusFor(config.value) : null;
  const needleColor = hasValue ? statusColor[currentStatus] : theme.palette.text.disabled;

  const clampedValue = hasValue ? Math.min(Math.max(config.value, 0), 100) : 0;
  const needleAngle = 180 - (clampedValue / 100) * 180; // 0..180 -> deg, driven by the actual value

  return (
    <GlassPanel sx={{ p: 3 }} selected={selectedPanel === panelId} onClick={() => onSelectPanel?.(panelId)}>
      <PanelHeader icon={PieChartRoundedIcon} title={config.title} />

      <Box
        sx={{
          position: "relative",
          width: GAUGE_SIZE,
          height: GAUGE_SIZE,
          mx: "auto",
          mb: 1,
          "& svg:focus, & svg *:focus": { outline: "none" },
        }}
      >
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={bandData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="85%"
              startAngle={180}
              endAngle={0}
              innerRadius={92}
              outerRadius={130}
              cornerRadius={4}
              stroke="none"
              isAnimationActive={false}
            >
              <Cell fill={statusColor.low} opacity={hasValue ? 1 : 0.35} />
              <Cell fill={statusColor.mid} opacity={hasValue ? 1 : 0.35} />
              <Cell fill={statusColor.high} opacity={hasValue ? 1 : 0.35} />
            </Pie>
          </PieChart>
        </ResponsiveContainer>

        {/* needle + center readout, overlaid absolutely — cx/cy match the
            Pie's actual cx="50%" cy="85%" exactly, so the needle's base
            sits right at the pie center instead of drifting off it.
            No needle at all when there's no value to point to. */}
        {hasValue && (
          <Box sx={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
            <svg viewBox={`0 0 ${VIEWBOX} ${VIEWBOX}`} width="100%" height="100%">
              <circle cx={cx} cy={cy} r="7" fill={needleColor} />
              <line
                x1={cx}
                y1={cy}
                x2={cx + (innerR - 6) * Math.cos(needleAngle * RADIAN)}
                y2={cy - (innerR - 6) * Math.sin(needleAngle * RADIAN)}
                stroke={needleColor}
                strokeWidth="4"
                strokeLinecap="round"
              />
            </svg>
          </Box>
        )}

        <Box sx={{ position: "absolute", left: 0, right: 0, bottom: 6, textAlign: "center" }}>
          <Typography sx={{ fontSize: 30, fontWeight: 700, lineHeight: 1, color: needleColor }}>
            {hasValue ? `${config.value.toFixed(1)}%` : "—"}
          </Typography>
          {!hasValue && (
            <Typography sx={{ ...textSecondarySx, fontSize: 11.5, fontWeight: 500, mt: 0.5 }}>
              Not available yet
            </Typography>
          )}
        </Box>
      </Box>

      <Stack direction="row" spacing={2.5} justifyContent="center" flexWrap="wrap" sx={{ mt: 1.5 }}>
        {STATUS_BANDS.map((b) => (
          <Stack key={b.key} direction="row" spacing={0.75} alignItems="center">
            <Box sx={{ width: 8, height: 8, borderRadius: "50%", bgcolor: statusColor[b.key] }} />
            <Typography sx={{ ...textSecondarySx, fontSize: 11.5, fontWeight: 500 }}>{b.name}</Typography>
          </Stack>
        ))}
      </Stack>
    </GlassPanel>
  );
}









// HeatTree.jsx

/* ---------------------------------------------------------------------- */
/*  HeatTree.jsx                                                           */
/*  A heatmap-style tile layout. Tile SIZE (both WIDTH and HEIGHT,         */
/*  independently, not sharing a dimension with neighbors) grows with the  */
/*  item's value, and tile COLOR is a continuous dark→light gradient tied  */
/*  to the value itself.                                                  */
/*                                                                          */
/*  SIZING MODEL — read this before touching sizing again.                 */
/*  Earlier versions used an actual "treemap" (recursive area-filling      */
/*  split, like D3/Excel/Power BI treemaps). A real treemap MUST share one */
/*  dimension between items in the same row/column — that's not a bug,    */
/*  it's the geometry required to fill 100% of the area with no gaps or    */
/*  overlaps. Per explicit request, this version drops that constraint:    */
/*  every tile gets its own independent width AND height, computed only    */
/*  from its own value — so two items never have to "share" a row height  */
/*  or column width. The tradeoff (accepted per request): tiles are laid  */
/*  out with CSS flex-wrap, so there can be leftover empty space at the    */
/*  end of a row instead of a perfectly filled rectangle.                 */
/*                                                                          */
/*  Both width and height are computed as sqrt(value) — not value itself. */
/*  With BOTH dimensions scaling by sqrt(value), the tile's AREA ends up   */
/*  proportional to value (since side² ∝ (√value)² = value), which is the */
/*  mathematically correct way to make a 2D shape's size represent a      */
/*  1D number — the same reasoning bubble charts use for bubble radius.   */
/*                                                                          */
/*  Because size is a pure function of value, two items with the exact    */
/*  same value automatically get the exact same size — no special-case    */
/*  grouping logic needed for that anymore.                               */
/* ---------------------------------------------------------------------- */

import React, { useMemo, useState } from "react";
import { Box, Stack, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Inventory2RoundedIcon from "@mui/icons-material/Inventory2Rounded";
import { GlassPanel, PanelHeader, MiniSelect, RADIUS, textSecondarySx } from "./Common";
import { heatColor, mixHex, getColor, formatAmount } from "./Utils";

/* ---- Size formula --------------------------------------------------------
 * Tune these two numbers to make the smallest/largest tiles bigger or
 * smaller overall — nothing else needs to change.
 *   MIN_SIZE  = size (px) for the smallest value in the set — the floor,
 *               so a tiny value never becomes an unreadable sliver.
 *   MAX_EXTRA = how much bigger the largest value's tile gets on top of
 *               MIN_SIZE (so the largest tile is MIN_SIZE + MAX_EXTRA). */
const MIN_SIZE = 96;
const MAX_EXTRA = 150;

function sizeForRatio(ratio) {
  return MIN_SIZE + ratio * MAX_EXTRA;
}

/** A single tile. `size` is an explicit pixel width AND height — this
 * tile doesn't know or care what its neighbors are sized. */
function Tile({ item, size, color, shareLabel, onClick }) {
  const theme = useTheme();
  const fg = theme.palette.getContrastText(color);
  const dense = size < 130; // smaller tiles use tighter text so content still fits
  const sheen = mixHex(color, "#ffffff", 0.16);

  return (
    <Box
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      onClick={onClick}
      sx={{
        width: size,
        height: size,
        flexShrink: 0,
        borderRadius: RADIUS.sm,
        p: dense ? 1 : 1.5,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        overflow: "hidden",
        cursor: onClick ? "pointer" : "default",
        background: `linear-gradient(135deg, ${sheen} 0%, ${color} 55%)`,
        color: fg,
        transition: "transform 0.18s ease, box-shadow 0.18s ease",
        "&:hover": { transform: "scale(1.03)", boxShadow: theme.shadows[6], zIndex: 1 },
      }}
    >
      <Typography sx={{ fontFamily: theme.typography.fontFamily, fontSize: dense ? 11 : 13, fontWeight: 600, opacity: 0.92, lineHeight: 1.25 }} noWrap>
        {item.name}
      </Typography>
      <Box sx={{ minWidth: 0 }}>
        <Typography sx={{ fontFamily: theme.typography.fontFamily, fontSize: dense ? 13 : 19, fontWeight: 700, lineHeight: 1.2 }} noWrap>
          {formatAmount(item.value)}
        </Typography>
        {!dense && (
          <Typography sx={{ fontFamily: theme.typography.fontFamily, fontSize: 11.5, opacity: 0.82, mt: 0.25 }}>
            {item.share}% {shareLabel}
          </Typography>
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
 *    wiring, shared with every other panel (see GlassPanel in DashboardPage.jsx).
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
  const hasFilter = Array.isArray(config.filterOptions) && config.filterOptions.length > 0;
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

  const sortedItems = useMemo(() => [...items].sort((a, b) => b.value - a.value), [items]);
  const maxValue = sortedItems.length ? sortedItems[0].value : 0;

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

      {/* flex-wrap, not a treemap grid: every tile gets its own independent
          width/height, so rows can end with leftover empty space instead
          of every tile in a row being forced to share one height. */}
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
        {sortedItems.map((item) => {
          const ratio = maxValue > 0 ? Math.sqrt(item.value) / Math.sqrt(maxValue) : 0;
          return (
            <Tile
              key={item.name}
              item={item}
              size={sizeForRatio(ratio)}
              color={colorFor(item.value)}
              shareLabel={shareLabel}
              onClick={onTileClick ? () => onTileClick(item) : undefined}
            />
          );
        })}
      </Box>

      <Legend items={legend} colorFor={legendColorFor} />
    </GlassPanel>
  );
}









// MapApiToDashboardData.jsx

/* ---------------------------------------------------------------------- */
/*  mapApiToDashboardData.js                                               */
/*  Translates ONE `staticDashboardData[i]` section from the real API      */
/*  response into the exact shape <DepositsLoansDashboard data={...} />    */
/*  expects. This is the ONLY place that needs to change if the API        */
/*  response shape changes — no component touches the raw API shape.       */
/*                                                                          */
/*  Values NOT present in the API are calculated here, never hardcoded:    */
/*   - `share` (% of total) per deposit item                              */
/*   - `topValue` (largest category, formatted) per bar panel             */
/*                                                                          */
/*  The Loans section has been removed entirely — the API response has no  */
/*  loans data (per your confirmation). The CASA gauge's `value` comes     */
/*  back as `null` when the API hasn't populated it yet (also confirmed)   */
/*  — Gauge.jsx renders an explicit "not available" state for that case.   */
/* ---------------------------------------------------------------------- */

import { formatAmount, normalizeDepositName } from "./Utils";

function mapItems(rawItems) {
  if (!Array.isArray(rawItems)) return [];
  return rawItems.map((it) => ({
    name: normalizeDepositName(it.name),
    type: String(it.type || "").trim(),
    value: Number(it.value) || 0,
  }));
}

/** Adds a `share` (% of the group's total, one decimal place) to each item —
 * not provided by the API, calculated here. */
function withShare(items) {
  const total = items.reduce((sum, it) => sum + it.value, 0);
  return items.map((it) => ({
    ...it,
    share: total > 0 ? Number(((it.value / total) * 100).toFixed(1)) : 0,
  }));
}

/** "Largest category" summary line shown on the bar panels — not provided
 * by the API, calculated here from whatever data came back. */
function topValueOf(items) {
  if (!items.length) return undefined;
  return formatAmount(Math.max(...items.map((it) => it.value)));
}

/**
 * @param {object} section — one entry from `response.data.staticDashboardData`
 * @returns the `data` prop shape DepositsLoansDashboard expects, or null if
 *          `section` is missing/empty.
 */
export default function mapApiToDashboardData(section) {
  if (!section) return null;

  const depositsRaw = section.deposits || {};
  const demandRaw = section.demanddeposits || {};
  const timeRaw = section.timedeposits || {};
  const casaRaw = section.casaratio || {};

  const depositItems = withShare(mapItems(depositsRaw.data));
  const demandItems = mapItems(demandRaw.data);
  const timeItems = mapItems(timeRaw.data);

  return {
    // Not present in the API — static page copy, not a business figure, so
    // this is the one place left as plain text rather than derived data.
    header: {
      title: "Deposits Dashboard",
      subtitle: "Portfolio overview by category",
    },

    casaGauge: {
      title: casaRaw.title || "CASA Ratio",
      subtitle: casaRaw.subtitle || undefined,
      // API currently returns data: null — Gauge.jsx shows an explicit
      // "not available yet" state whenever this is null/undefined.
      value: typeof casaRaw.data === "number" ? casaRaw.data : null,
      centerLabel: casaRaw.title || "CASA Ratio",
    },

    depositsComposition: {
      title: depositsRaw.title,
      subtitle: depositsRaw.subtitle || undefined,
      // Filter dropdown options + default come straight from the API, not
      // hardcoded. Filtering itself is by each item's `type` field — see
      // HeatTree.jsx.
      filterOptions: Array.isArray(depositsRaw.filterOptions) ? depositsRaw.filterOptions : undefined,
      activeFilter: depositsRaw.filterOptions?.[0],
      items: depositItems,
      legend: depositItems.map((it) => ({ name: it.name })),
    },

    demandDeposits: {
      title: demandRaw.title,
      topValue: topValueOf(demandItems),
      data: demandItems,
    },

    termDeposits: {
      title: timeRaw.title,
      topValue: topValueOf(timeItems),
      data: timeItems,
    },
  };
}







// Utils.js

/* ---------------------------------------------------------------------- */
/*  utils.js — pure logic only, no React, no data                          */
/*  Two independent things live here on purpose: color math and treemap    */
/*  layout math. Both are "given numbers, return numbers/strings" — no     */
/*  UI, no imports beyond each other — so they're easy to unit test and    */
/*  easy to find without hunting through component files.                 */
/* ---------------------------------------------------------------------- */

/* ---- Color helpers ----------------------------------------------------
 * Deposit categories use a fixed brand palette, ordered dark → light so a
 * treemap sorted largest→smallest value reads as a heatmap. Everything
 * else (bar panels, drill-down subcategories, loan categories) falls back
 * to a theme-derived palette assigned BY POSITION, guaranteeing every
 * bar/tile in one chart gets a distinct color (a name-hash fallback was
 * tried first but collides for some category names). */

export const FIXED_DEPOSIT_COLORS = {
  "Term Deposit": "#0c2340",
  "Saving Bank A/c": "#1e3a5f",
  "Current A/c": "#3b82f6",
  "Cash Credit Cr Balance": "#2d8a9e",
  "Special Term Deposit": "#0ea5e9",
  "Other Demand Deposit": "#06b6d4",
  "Other Term Deposit": "#5cbdb9",
  "Certificate of Deposit": "#7dd3fc",
};

export function hexToRgb(hex) {
  const clean = hex.replace("#", "");
  const full = clean.length === 3 ? clean.split("").map((c) => c + c).join("") : clean;
  const n = parseInt(full, 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

export function rgbToHex([r, g, b]) {
  return `#${[r, g, b]
    .map((v) => Math.max(0, Math.min(255, Math.round(v))).toString(16).padStart(2, "0"))
    .join("")}`;
}

export function mixHex(hexA, hexB, t) {
  const a = hexToRgb(hexA);
  const b = hexToRgb(hexB);
  return rgbToHex(a.map((v, i) => v + (b[i] - v) * t));
}

/** Continuous color between `lightHex` (lowest value in the set) and
 * `darkHex` (highest value) — the heatmap gradient used by treemap tiles. */
export function heatColor(value, min, max, darkHex, lightHex) {
  const t = max === min ? 1 : (value - min) / (max - min);
  return mixHex(lightHex, darkHex, t);
}

/** A theme-derived categorical palette (10 tones cycling through
 * primary/info/secondary/success at dark/main/light weights). */
export function fallbackPalette(theme) {
  const p = theme.palette;
  return [
    p.primary.dark,
    p.info.dark,
    p.secondary.dark,
    p.success.dark,
    p.primary.main,
    p.info.main,
    p.secondary.main,
    p.success.main,
    p.primary.light,
    p.info.light,
  ].filter(Boolean);
}

/** Resolves a category's color: the fixed deposit hex if it's a known
 * deposit category, otherwise a theme color chosen by its position in the
 * current list (guarantees every item in one chart gets a different
 * color — pass the item's index within whichever list is being rendered). */
export function getColor(name, index, theme) {
  if (FIXED_DEPOSIT_COLORS[name]) return FIXED_DEPOSIT_COLORS[name];
  const palette = fallbackPalette(theme);
  return palette[index % palette.length];
}

/* ---- Amount formatting --------------------------------------------------
 * ⚠️ ASSUMPTION, NOT CONFIRMED: the API's raw numbers (e.g. 987654.32) are
 * treated here as plain rupees and shown with Indian-style comma grouping.
 * This is the ONE function to change once the real unit is confirmed — no
 * other file formats an amount directly, they all call this. */

export function formatAmount(value) {
  if (value === null || value === undefined || Number.isNaN(Number(value))) return "—";
  return `₹ ${Number(value).toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

/* ---- Name normalization --------------------------------------------------
 * The API sends some category names with inconsistent casing/whitespace
 * (e.g. "term deposit " vs "Certificate of Deposit"). Trims whitespace and,
 * for names that match a FIXED_DEPOSIT_COLORS key case-insensitively, snaps
 * to that key's exact casing — so color lookup and any name-based matching
 * stay reliable regardless of how the API happens to capitalize things. */

export function normalizeDepositName(rawName = "") {
  const trimmed = String(rawName).trim();
  const canonical = Object.keys(FIXED_DEPOSIT_COLORS).find(
    (key) => key.toLowerCase() === trimmed.toLowerCase()
  );
  return canonical || trimmed;
}

/* ---- Treemap layout ----------------------------------------------------
 * A simple recursive "slice and dice" treemap: split the (already
 * value-sorted) list roughly in half by cumulative value, lay that out as
 * two rectangles side by side (or stacked), and recurse into each half
 * alternating direction. Tile SIZE ends up proportional to value.
 *
 * Pure function — takes an items array (each needs a numeric `value`) plus
 * a starting rect (x, y, w, h in percent) and returns
 * [{ item, x, y, w, h }, ...] covering that rect. */

export function buildTreemap(items, x, y, w, h, horizontal = true) {
  if (items.length === 0) return [];
  if (items.length === 1) return [{ item: items[0], x, y, w, h }];

  const total = items.reduce((sum, it) => sum + it.value, 0);
  let splitIndex = 1;
  let bestDiff = Infinity;
  let runningSum = 0;
  for (let k = 0; k < items.length - 1; k += 1) {
    runningSum += items[k].value;
    const diff = Math.abs(runningSum - total / 2);
    if (diff < bestDiff) {
      bestDiff = diff;
      splitIndex = k + 1;
    }
  }

  const firstGroup = items.slice(0, splitIndex);
  const secondGroup = items.slice(splitIndex);
  const firstSum = firstGroup.reduce((sum, it) => sum + it.value, 0);
  const ratio = total === 0 ? 0.5 : firstSum / total;

  if (horizontal) {
    const w1 = w * ratio;
    return [
      ...buildTreemap(firstGroup, x, y, w1, h, false),
      ...buildTreemap(secondGroup, x + w1, y, w - w1, h, false),
    ];
  }
  const h1 = h * ratio;
  return [
    ...buildTreemap(firstGroup, x, y, w, h1, true),
    ...buildTreemap(secondGroup, x, y + h1, w, h - h1, true),
  ];
}
