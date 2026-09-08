import React, { useState } from "react";
import {
  Box,
  Paper,
  Stack,
  Typography,
  ToggleButton,
  ToggleButtonGroup,
  Select,
  MenuItem,
  Button,
  Chip,
  Divider,
} from "@mui/material";
import { createTheme, ThemeProvider, alpha } from "@mui/material/styles";
import RefreshRoundedIcon from "@mui/icons-material/RefreshRounded";
import CalendarTodayRoundedIcon from "@mui/icons-material/CalendarTodayRounded";
import TrendingUpRoundedIcon from "@mui/icons-material/TrendingUpRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import AccountBalanceRoundedIcon from "@mui/icons-material/AccountBalanceRounded";
import DescriptionRoundedIcon from "@mui/icons-material/DescriptionRounded";
import PercentRoundedIcon from "@mui/icons-material/PercentRounded";
import SavingsRoundedIcon from "@mui/icons-material/SavingsRounded";
import PieChartRoundedIcon from "@mui/icons-material/PieChartRounded";
import Inventory2RoundedIcon from "@mui/icons-material/Inventory2Rounded";
import AccountBalanceWalletRoundedIcon from "@mui/icons-material/AccountBalanceWalletRounded";
import LightbulbRoundedIcon from "@mui/icons-material/LightbulbRounded";
import GroupsRoundedIcon from "@mui/icons-material/GroupsRounded";
import EqualizerRoundedIcon from "@mui/icons-material/EqualizerRounded";

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  LabelList,
} from "recharts";

import dashboardData from "./bankingData.json";

/* ---------------------------------------------------------------------- */
/*  Theme                                                                  */
/* ---------------------------------------------------------------------- */

const theme = createTheme({
  palette: {
    mode: "light",
    primary: { main: "#6C5CE0", dark: "#5847C9", light: "#8B7CF6" },
    background: { default: "transparent", paper: "#FFFFFF" },
    text: { primary: "#1E1B3A", secondary: "#6B6584" },
  },
  shape: { borderRadius: 20 },
  typography: {
    fontFamily: [
      "Inter",
      "-apple-system",
      "BlinkMacSystemFont",
      "Segoe UI",
      "Roboto",
      "Helvetica",
      "Arial",
      "sans-serif",
    ].join(","),
  },
});

const ICONS = {
  coins: SavingsRoundedIcon,
  bank: AccountBalanceRoundedIcon,
  file: DescriptionRoundedIcon,
  percent: PercentRoundedIcon,
  trendUp: TrendingUpRoundedIcon,
  users: GroupsRoundedIcon,
  bars: EqualizerRoundedIcon,
};

/* ---------------------------------------------------------------------- */
/*  Small building blocks                                                  */
/* ---------------------------------------------------------------------- */

function PanelHeader({ icon: Icon, title, action, iconColor = "#6C5CE0" }) {
  return (
    <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 2 }}>
      <Stack direction="row" alignItems="center" spacing={1.25}>
        {Icon && (
          <Box
            sx={{
              width: 34,
              height: 34,
              borderRadius: "10px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              bgcolor: alpha(iconColor, 0.12),
              color: iconColor,
            }}
          >
            <Icon sx={{ fontSize: 19 }} />
          </Box>
        )}
        <Typography sx={{ fontWeight: 800, fontSize: 15, letterSpacing: 0.2, color: "text.primary" }}>
          {title}
        </Typography>
      </Stack>
      {action}
    </Stack>
  );
}

function PillToggle({ options, value, onChange, size = "small" }) {
  return (
    <ToggleButtonGroup
      exclusive
      size={size}
      value={value}
      onChange={(_, v) => v && onChange(v)}
      sx={{
        bgcolor: "#F2EEFB",
        borderRadius: "999px",
        p: "3px",
        "& .MuiToggleButtonGroup-grouped": {
          border: 0,
          borderRadius: "999px !important",
          textTransform: "none",
          fontWeight: 600,
          fontSize: 13,
          px: 1.75,
          py: 0.5,
          color: "text.secondary",
          "&.Mui-selected": {
            bgcolor: "primary.main",
            color: "#fff",
            "&:hover": { bgcolor: "primary.dark" },
          },
        },
      }}
    >
      {options.map((opt) => (
        <ToggleButton key={opt} value={opt}>
          {opt}
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  );
}

function MiniSelect({ options, value, onChange }) {
  return (
    <Select
      size="small"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      sx={{
        fontSize: 13,
        fontWeight: 600,
        borderRadius: "10px",
        bgcolor: "#F7F5FC",
        "& .MuiOutlinedInput-notchedOutline": { border: "1px solid #E7E2F7" },
        "& .MuiSelect-select": { py: 0.75, pr: 4 },
      }}
    >
      {options.map((opt) => (
        <MenuItem key={opt} value={opt} sx={{ fontSize: 13 }}>
          {opt}
        </MenuItem>
      ))}
    </Select>
  );
}

/* ---------------------------------------------------------------------- */
/*  KPI Card                                                               */
/* ---------------------------------------------------------------------- */

function KpiCard({ kpi }) {
  const Icon = ICONS[kpi.icon] || SavingsRoundedIcon;
  return (
    <Paper
      elevation={0}
      sx={{
        flex: 1,
        minWidth: 220,
        p: 2.25,
        borderRadius: "20px",
        border: "1px solid #ECE6FA",
        bgcolor: "#fff",
      }}
    >
      <Stack direction="row" spacing={1.75} alignItems="flex-start">
        <Box
          sx={{
            width: 46,
            height: 46,
            flexShrink: 0,
            borderRadius: "14px",
            bgcolor: kpi.bg,
            color: kpi.color,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Icon sx={{ fontSize: 24 }} />
        </Box>
        <Box sx={{ minWidth: 0 }}>
          <Typography sx={{ fontSize: 13.5, fontWeight: 600, color: "text.secondary" }}>
            {kpi.label}
          </Typography>
          <Typography sx={{ fontSize: 24, fontWeight: 800, color: "#1E1B3A", lineHeight: 1.3 }}>


</Typography>
          <Stack direction="row" spacing={0.5} alignItems="center">
            <Typography
              sx={{
                fontSize: 12.5,
                fontWeight: 700,
                color: kpi.trend === "up" ? "#16A34A" : "#DC2626",
                display: "flex",
                alignItems: "center",
              }}
            >
              {kpi.trend === "up" ? "▲" : "▼"}&nbsp;{kpi.change}
            </Typography>
            <Typography sx={{ fontSize: 12, color: "text.secondary" }}>
              vs previous period
            </Typography>
          </Stack>
        </Box>
      </Stack>
    </Paper>
  );
}

/* ---------------------------------------------------------------------- */
/*  CASA Trend / Total Deposits Trend (line + highlighted tooltip)         */
/* ---------------------------------------------------------------------- */

function TrendTooltip({ active, payload, label, unit, highlightDate }) {
  if (!active || !payload || !payload.length) return null;
  return (
    <Box
      sx={{
        bgcolor: "#2A1E5C",
        color: "#fff",
        px: 1.5,
        py: 1,
        borderRadius: "10px",
        fontSize: 12,
        boxShadow: "0 8px 20px rgba(42,30,92,0.35)",
      }}
    >
      <Typography sx={{ fontSize: 11, opacity: 0.8, mb: 0.25 }}>{label}</Typography>
      <Typography sx={{ fontSize: 14, fontWeight: 800 }}>
        {payload[0].value}
        {unit}
      </Typography>
    </Box>
  );
}

function TrendChart({ config, color = "#6C5CE0" }) {
  const [period, setPeriod] = useState(config.activePeriod);
  const data = config.data;

  return (
    <Paper elevation={0} sx={{ p: 2.5, borderRadius: "20px", border: "1px solid #ECE6FA", height: "100%" }}>
      <PanelHeader
        icon={TrendingUpRoundedIcon}
        title={config.title}
        action={<PillToggle options={config.periods} value={period} onChange={setPeriod} />}
      />
      <Box sx={{ width: "100%", height: 300 }}>
        <ResponsiveContainer>
          <AreaChart data={data} margin={{ top: 30, right: 10, left: -10, bottom: 0 }}>
            <defs>
              <linearGradient id={`grad-${config.title}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={color} stopOpacity={0.28} />
                <stop offset="100%" stopColor={color} stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} stroke="#EEEAF9" />
            <XAxis
              dataKey="date"
              tick={{ fontSize: 11, fill: "#9691AC" }}
              axisLine={{ stroke: "#EEEAF9" }}
              tickLine={false}
            />
            <YAxis
              tick={{ fontSize: 11, fill: "#9691AC" }}
              axisLine={false}
              tickLine={false}
              domain={["auto", "auto"]}
              width={40}
            />
            <Tooltip content={<TrendTooltip unit={config.unit === "%" ? "" : ""} />} />
            <Area
              type="monotone"
              dataKey="value"
              stroke={color}
              strokeWidth={2.5}
              fill={`url(#grad-${config.title})`}
              dot={{ r: 3.5, fill: "#fff", stroke: color, strokeWidth: 2 }}
              activeDot={{ r: 6, fill: color, stroke: "#fff", strokeWidth: 2 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </Box>
    </Paper>
  );
}

/* ---------------------------------------------------------------------- */
/*  CASA Gauge (semi-donut + needle) built with Recharts Pie               */
/* ---------------------------------------------------------------------- */

function Gauge({ config }) {
  const RADIAN = Math.PI / 180;
  const cx = 150;
  const cy = 150;
  const outerR = 130;
  const innerR = 92;

  const needleAngle = 180 - (config.needlePercent / 100) * 180; // 0..180 -> deg
  const needleLen = innerR - 6;
  const nx = cx + needleLen * Math.cos(needleAngle * RADIAN);
  const ny = cy - needleLen * Math.sin(needleAngle * RADIAN);

  return (
    <Paper elevation={0} sx={{ p: 2.5, borderRadius: "20px", border: "1px solid #ECE6FA", height: "100%" }}>
      <PanelHeader icon={PieChartRoundedIcon} title={config.title} />
      <Typography sx={{ fontSize: 12.5, color: "text.secondary", mt: -1.5, mb: 1 }}>
        {config.subtitle}
      </Typography>

      <Box sx={{ position: "relative", width: "100%", height: 210 }}>
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={config.segments}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="85%"
              startAngle={180}
              endAngle={0}
              innerRadius={92}
              outerRadius={130}
              paddingAngle={2}
              stroke="none"
              isAnimationActive={false}
            >
              {config.segments.map((s, i) => (
                <Cell key={i} fill={s.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>

        {/* needle + center readout, overlaid absolutely */}
        <Box sx={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
          <svg viewBox="0 0 300 300" width="100%" height="100%">
            <circle cx={cx} cy={cy * 0.85 + 0} r="7" fill="#2A1E5C" />
            <line
              x1={cx}
              y1={cy * 0.85}
              x2={cx + (innerR - 6) * Math.cos(needleAngle * RADIAN)}
              y2={cy * 0.85 - (innerR - 6) * Math.sin(needleAngle * RADIAN)}
              stroke="#2A1E5C"
              strokeWidth="4"
              strokeLinecap="round"
            />
          </svg>
        </Box>

        <Box
          sx={{
            position: "absolute",
            left: 0,
            right: 0,
            bottom: 6,
            textAlign: "center",
          }}
        >
          <Typography sx={{ fontSize: 30, fontWeight: 800, color: "#1E1B3A", lineHeight: 1.1 }}>
            {config.value.toFixed(1)}%
          </Typography>
          <Typography sx={{ fontSize: 13, color: "text.secondary", fontWeight: 600 }}>
            {config.centerLabel}
          </Typography>
        </Box>
      </Box>

      <Stack direction="row" spacing={2.5} justifyContent="center" sx={{ mt: 1 }}>
        {config.segments.map((s) => (
          <Stack key={s.name} direction="row" spacing={0.75} alignItems="center">
            <Box sx={{ width: 9, height: 9, borderRadius: "50%", bgcolor: s.color }} />
            <Typography sx={{ fontSize: 12, color: "text.secondary", fontWeight: 600 }}>
              {s.name}
            </Typography>
          </Stack>
        ))}
      </Stack>
    </Paper>
  );
}

/* ---------------------------------------------------------------------- */
/*  Deposits composition — proportional mosaic (à la treemap)              */
/* ---------------------------------------------------------------------- */

function CompositionMosaic({ config }) {
  const [filter, setFilter] = useState(config.activeFilter);
  const items = config.items;
  // proportional flex-basis mosaic, biggest three on top row, remaining stacked on the right
  const [big1, big2, big3, ...rest] = items;

  const Tile = ({ item, dark, sx }) => (
    <Box
      sx={{
        borderRadius: "14px",
        p: 1.5,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        bgcolor: item.color,
        color: "#fff",
        minHeight: 70,
        ...sx,
      }}
    >

<Typography sx={{ fontSize: 12.5, fontWeight: 700, opacity: 0.95, lineHeight: 1.2 }}>
        {item.name}
      </Typography>
      <Box>
        <Typography sx={{ fontSize: 16, fontWeight: 800 }}>₹ {item.value.toFixed(2)} T</Typography>
        <Typography sx={{ fontSize: 11, opacity: 0.9 }}>{item.share}%</Typography>
      </Box>
    </Box>
  );

  return (
    <Paper elevation={0} sx={{ p: 2.5, borderRadius: "20px", border: "1px solid #ECE6FA", height: "100%" }}>
      <PanelHeader
        icon={Inventory2RoundedIcon}
        title={config.title}
        action={<MiniSelect options={config.filterOptions} value={filter} onChange={setFilter} />}
      />
      <Typography sx={{ fontSize: 12.5, color: "text.secondary", mt: -1.5, mb: 1.5 }}>
        {config.subtitle}
      </Typography>

      <Box sx={{ display: "flex", gap: 1, height: 190 }}>
        <Tile item={big1} sx={{ flex: 1.3 }} />
        <Tile item={big2} sx={{ flex: 1.1 }} />
        <Box sx={{ flex: 1, display: "flex", flexDirection: "column", gap: 1 }}>
          <Tile item={big3} sx={{ flex: 1 }} />
          <Box sx={{ display: "flex", gap: 1, flex: 1 }}>
            {rest.map((r) => (
              <Tile key={r.name} item={r} sx={{ flex: 1, "& .MuiTypography-root": { fontSize: 10.5 } }} />
            ))}
          </Box>
        </Box>
      </Box>

      <Box
        sx={{
          mt: 2,
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          rowGap: 0.75,
          columnGap: 2,
        }}
      >
        {config.legend.map((l) => (
          <Stack key={l.name} direction="row" spacing={0.75} alignItems="center">
            <Box sx={{ width: 9, height: 9, borderRadius: "3px", bgcolor: l.color, flexShrink: 0 }} />
            <Typography sx={{ fontSize: 11.5, color: "text.secondary", fontWeight: 600 }}>
              {l.name}
            </Typography>
          </Stack>
        ))}
      </Box>
    </Paper>
  );
}

/* ---------------------------------------------------------------------- */
/*  Bar chart panels (Demand / Term deposits)                              */
/* ---------------------------------------------------------------------- */

function BarPanel({ icon, config }) {
  const [option, setOption] = useState(config.activeOption);
  return (
    <Paper elevation={0} sx={{ p: 2.5, borderRadius: "20px", border: "1px solid #ECE6FA", height: "100%" }}>
      <PanelHeader
        icon={icon}
        title={config.title}
        action={<MiniSelect options={config.dropdownOptions} value={option} onChange={setOption} />}
      />
      <Box sx={{ width: "100%", height: 260 }}>
        <ResponsiveContainer>
          <BarChart data={config.data} margin={{ top: 24, right: 10, left: -10, bottom: 0 }} barCategoryGap="28%">
            <CartesianGrid vertical={false} stroke="#EEEAF9" />
            <XAxis
              dataKey="name"
              tick={{ fontSize: 10.5, fill: "#9691AC" }}
              axisLine={{ stroke: "#EEEAF9" }}
              tickLine={false}
              interval={0}
            />
            <YAxis tick={{ fontSize: 11, fill: "#9691AC" }} axisLine={false} tickLine={false} width={32} />
            <Bar dataKey="value" radius={[8, 8, 0, 0]} maxBarSize={54}>
              {config.data.map((d, i) => (
                <Cell key={i} fill={d.color} />
              ))}
              <LabelList
                dataKey="value"
                position="top"
                formatter={(v) => `₹${v < 1 ? v.toFixed(4) : v}T`}
                style={{ fontSize: 12, fontWeight: 800, fill: "#1E1B3A" }}
              />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </Box>
    </Paper>
  );
}

/* ---------------------------------------------------------------------- */
/*  Forecast composed chart                                                */
/* ---------------------------------------------------------------------- */

function ForecastTooltip({ active, payload, label }) {
  if (!active || !payload || !payload.length) return null;
  return (
    <Box
      sx={{
        bgcolor: "#fff",
        border: "1px solid #ECE6FA",
        boxShadow: "0 10px 24px rgba(30,27,58,0.12)",
        borderRadius: "10px",
        px: 1.5,
        py: 1,
        fontSize: 12,
      }}
    >
      <Typography sx={{ fontSize: 11, color: "text.secondary", mb: 0.5 }}>{label}</Typography>
      {payload
        .filter((p) => p.value !== null && p.value !== undefined)
        .map((p) => (
          <Typography key={p.dataKey} sx={{ fontSize: 12, fontWeight: 700, color: p.stroke || p.color }}>
            {p.name}: {Number(p.value).toLocaleString("en-IN")}
          </Typography>
        ))}
    </Box>
  );
}

function ForecastChart({ config }) {
  return (
    <Paper elevation={0} sx={{ p: 2.5, borderRadius: "20px", border: "1px solid #ECE6FA", height: "100%" }}>
      <PanelHeader icon={TrendingUpRoundedIcon} title={config.title} />
      <Box sx={{ width: "100%", height: 300 }}>
        <ResponsiveContainer>
          <LineChart data={config.data} margin={{ top: 10, right: 16, left: -6, bottom: 0 }}>
            <CartesianGrid vertical={false} stroke="#EEEAF9" />
            <XAxis
              dataKey="date"
              tick={{ fontSize: 10.5, fill: "#9691AC" }}
              axisLine={{ stroke: "#EEEAF9" }}
              tickLine={false}
            />
            <YAxis
              tick={{ fontSize: 10.5, fill: "#9691AC" }}
              axisLine={false}
              tickLine={false}
              width={64}
              tickFormatter={(v) => v.toLocaleString("en-IN")}
              domain={["auto", "auto"]}
            />
            <Tooltip content={<ForecastTooltip />} />
            {config.legend.map((l) => (
              <Line
                key={l.key}
                type="monotone"
                dataKey={l.key}
                name={l.name}
                stroke={l.color}
                strokeWidth={2}
                strokeDasharray={l.dashed ? "6 4" : undefined}
                dot={l.dashed ? false : { r: 3, fill: "#fff", stroke: l.color, strokeWidth: 2 }}
                connectNulls
                isAnimationActive={false}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </Box>
      <Stack direction="row" spacing={2.5} justifyContent="center" flexWrap="wrap" sx={{ mt: 1 }}>
        {config.legend.map((l) => (
          <Stack key={l.key} direction="row" spacing={0.75} alignItems="center">
            <Box
              sx={{
                width: 18,
                height: 0,
                borderTop: `2.5px ${l.dashed ? "dashed" : "solid"} ${l.color}`,
              }}
            />
            <Typography sx={{ fontSize: 11.5, color: "text.secondary", fontWeight: 600 }}>
              {l.name}
            </Typography>
          </Stack>
        ))}
      </Stack>
    </Paper>
  );
}

/* ---------------------------------------------------------------------- */
/*  Insights panel                                                         */
/* ---------------------------------------------------------------------- */

function InsightsPanel({ config }) {
  return (
    <Paper elevation={0} sx={{ p: 2.5, borderRadius: "20px", border: "1px solid #ECE6FA", height: "100%" }}>
      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 1.5 }}>
        <Stack direction="row" alignItems="center" spacing={1.25}>
          <Box
            sx={{
              width: 34,
              height: 34,
              borderRadius: "10px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              bgcolor: alpha("#F59E0B", 0.15),
              color: "#B45309",
            }}
          >
            <LightbulbRoundedIcon sx={{ fontSize: 19 }} />
          </Box>
          <Typography sx={{ fontWeight: 800, fontSize: 15 }}>{config.title}</Typography>
        </Stack>
        <Typography
          sx={{ fontSize: 13, fontWeight: 700, color: "primary.main", cursor: "pointer" }}
        >
          View All
        </Typography>
      </Stack>
<Stack divider={<Divider sx={{ borderColor: "#F0EDFA" }} />} spacing={0}>
        {config.items.map((item, i) => {
          const Icon = ICONS[item.icon] || TrendingUpRoundedIcon;
          return (
            <Stack
              key={i}
              direction="row"
              alignItems="center"
              spacing={1.5}
              sx={{ py: 1.5, cursor: "pointer" }}
            >
              <Box
                sx={{
                  width: 38,
                  height: 38,
                  borderRadius: "12px",
                  bgcolor: "#F2EEFB",
                  color: "primary.main",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <Icon sx={{ fontSize: 19 }} />
              </Box>
              <Box sx={{ flex: 1, minWidth: 0 }}>
                <Typography sx={{ fontSize: 13.5, fontWeight: 700, color: "text.primary" }}>
                  {item.text}
                </Typography>
                {item.subtext && (
                  <Typography sx={{ fontSize: 12.5, color: "text.secondary" }}>
                    {item.subtext}
                  </Typography>
                )}
              </Box>
              <ChevronRightRoundedIcon sx={{ color: "#B7B0D6" }} />
            </Stack>
          );
        })}
      </Stack>
    </Paper>
  );
}

/* ---------------------------------------------------------------------- */
/*  Header                                                                  */
/* ---------------------------------------------------------------------- */

function DashboardHeader({ config }) {
  const [tab, setTab] = useState(config.activeTab);
  const [fy, setFy] = useState(config.financialYear);

  return (
    <Box
      sx={{
        position: "relative",
        mb: 2.5,
        px: { xs: 0.5, md: 1 },
        py: { xs: 2, md: 2.5 },
        // no background here — the app's own bg.svg (set globally, e.g. on <body>)
        // shows straight through behind the header text and controls.
      }}
    >
      <Stack
        direction={{ xs: "column", lg: "row" }}
        alignItems={{ xs: "flex-start", lg: "center" }}
        justifyContent="space-between"
        spacing={2}
      >
        <Box>
          <Typography sx={{ fontSize: { xs: 22, md: 26 }, fontWeight: 800, color: "#1E1B3A" }}>
            {config.title}
          </Typography>
          <Typography sx={{ fontSize: 13.5, color: "text.secondary", mt: 0.25 }}>
            {config.subtitle}
          </Typography>
        </Box>

        <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5} alignItems="center" flexWrap="wrap">
          <PillToggle options={config.tabs} value={tab} onChange={setTab} size="medium" />

          <Stack direction="row" spacing={1} alignItems="center">
            <Typography sx={{ fontSize: 13, color: "text.secondary", fontWeight: 600, whiteSpace: "nowrap" }}>
              Financial Year
            </Typography>
            <MiniSelect options={config.financialYearOptions} value={fy} onChange={setFy} />
          </Stack>

          <Chip
            icon={<CalendarTodayRoundedIcon sx={{ fontSize: "16px !important" }} />}
            label={`${config.dateRange.start}  ~  ${config.dateRange.end}`}
            sx={{
              bgcolor: "#fff",
              border: "1px solid #E7E2F7",
              fontWeight: 600,
              fontSize: 12.5,
              px: 0.5,
              height: 36,
              borderRadius: "10px",
            }}
          />

          <Button
            variant="contained"
            startIcon={<RefreshRoundedIcon />}
            sx={{
              textTransform: "none",
              fontWeight: 700,
              fontSize: 13.5,
              borderRadius: "10px",
              boxShadow: "none",
              px: 2,
              height: 36,
              "&:hover": { boxShadow: "none" },
            }}
          >
            Reset
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
}

/* ---------------------------------------------------------------------- */
/*  Root Dashboard                                                         */
/* ---------------------------------------------------------------------- */

export default function Dashboard({ data = dashboardData }) {
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ bgcolor: "background.default", minHeight: "100vh", p: { xs: 1.5, md: 3 } }}>
        <DashboardHeader config={data.header} />

        {/* KPI row */}
        <Stack direction={{ xs: "column", sm: "row" }} spacing={2} sx={{ mb: 2.5 }}>
          {data.kpis.map((kpi) => (
            <KpiCard key={kpi.id} kpi={kpi} />
          ))}
        </Stack>

        {/* Row 2: CASA trend / gauge / composition */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", lg: "1.35fr 1fr 1.35fr" },
            gap: 2.5,
            mb: 2.5,
            alignItems: "stretch",
          }}
        >
          <TrendChart config={data.casaTrend} color="#6C5CE0" />
          <Gauge config={data.casaGauge} />
          <CompositionMosaic config={data.depositsComposition} />
        </Box>

        {/* Row 3: bar panels + total deposits trend */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", lg: "1fr 1fr 1fr" },
            gap: 2.5,
            mb: 2.5,
            alignItems: "stretch",
          }}
        >
          <BarPanel icon={AccountBalanceWalletRoundedIcon} config={data.demandDeposits} />
          <BarPanel icon={DescriptionRoundedIcon} config={data.termDeposits} />
          <TrendChart config={data.totalDepositsTrend} color="#6C5CE0" />
        </Box>

        {/* Row 4: forecast + insights */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", lg: "1.6fr 1fr" },
            gap: 2.5,
          }}
        >
          <ForecastChart config={data.forecast} />
          <InsightsPanel config={data.insights} />
        </Box>
      </Box>
    </ThemeProvider>
  );
}
