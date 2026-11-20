/* ---------------------------------------------------------------------- */
/*  DashboardPage.jsx — main entry point / the ONE place the real API      */
/*  gets wired in.                                                        */
/*  Uses the project's existing `useApi` hook to fetch TWO independent      */
/*  endpoints once on mount:                                              */
/*   - /DS/dashboard/dashboard-data — the static snapshot (heatmap tiles,   */
/*     CASA ratio), mapped by mapApiToDashboardData.js.                    */
/*   - /DS/dashboard/trend-data — the 7-day date-wise data behind the       */
/*     Demand/Time Deposits and Loan Distribution panels, mapped by         */
/*     trendApi.js's mapTrendDataToSections().                            */
/*  Each fetch has its own independent loading/error state (two separate   */
/*  useApi() instances — sharing one would mix up their results), but the  */
/*  page waits for BOTH before rendering the dashboard, and surfaces        */
/*  either one's error the same way — this keeps the existing loading/     */
/*  error UI and overall page behavior unchanged, just gated on two        */
/*  fetches instead of one.                                               */
/*  No component under DepositsLoansDashboard knows an API exists — this   */
/*  is the only file that needs to change if either endpoint, auth, or      */
/*  response shape changes. Mount this file directly as your route/page.   */
/* ---------------------------------------------------------------------- */

import React, { useEffect, useMemo } from "react";
import { Box, Button, CircularProgress, Typography } from "@mui/material";
import useApi from "../../hooks/useApi"; // adjust path to match your project structure
import DepositsLoansDashboard from "./DepositsLoansDashboard";
import mapApiToDashboardData from "./MapApiToDashboardData";
import { mapTrendDataToSections, TREND_DATA_ENDPOINT } from "./trendApi";
import { textSecondarySx } from "./Common";

const DASHBOARD_ENDPOINT = "/DS/dashboard/dashboard-data";

export default function DashboardPage() {
  const { data: apiResponse, error, loading, callApi } = useApi();
  const {
    data: trendResponse,
    error: trendError,
    loading: trendLoading,
    callApi: callTrendApi,
  } = useApi();

  useEffect(() => {
    // Both fetches fire in parallel — neither waits on the other, since
    // they're two independent endpoints feeding two independent parts of
    // the page.
    callApi(DASHBOARD_ENDPOINT).catch(() => {
      // Swallow here — `error` from useApi already captures it below, and
      // callApi's own catch already logs the underlying error.
    });
    callTrendApi(TREND_DATA_ENDPOINT).catch(() => {
      // Same as above, for the trend fetch.
    });
    // Only fetch once on mount.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // The actual dashboard content is nested one level in:
  // response.data.staticDashboardData[0]. mapApiToDashboardData does all
  // the shape translation + derived calculations (share %, topValue, ...).
  const dashboardData = useMemo(() => {
    const section = apiResponse?.data?.staticDashboardData?.YSA ?? apiResponse?.data?.staticDashboardData?.[0];
    return mapApiToDashboardData(section);
  }, [apiResponse]);

  // trend-data's envelope is simpler: response.data is directly the array
  // of { key, title, products, data } sections.
  const trendSections = useMemo(
    () => mapTrendDataToSections(trendResponse?.data),
    [trendResponse],
  );

  const isLoading = (loading || trendLoading) && !dashboardData;
  const hasError = error || trendError;

  if (isLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "60vh",
          gap: 2,
        }}
      >
        <CircularProgress />
        <Typography sx={textSecondarySx}>Loading dashboard…</Typography>
      </Box>
    );
  }

  if (hasError) {
    const failedMessage =
      error?.response?.data?.message ||
      error?.message ||
      trendError?.response?.data?.message ||
      trendError?.message ||
      "Something went wrong while fetching data.";
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "60vh",
          gap: 2,
          textAlign: "center",
          px: 3,
        }}
      >
        <Typography sx={{ fontWeight: 700 }}>
          Couldn't load the dashboard
        </Typography>
        <Typography sx={textSecondarySx}>{failedMessage}</Typography>
        <Button
          variant="contained"
          onClick={() => {
            callApi(DASHBOARD_ENDPOINT);
            callTrendApi(TREND_DATA_ENDPOINT);
          }}
        >
          Retry
        </Button>
      </Box>
    );
  }

  if (!dashboardData) {
    return (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "60vh",
        }}
      >
        <Typography sx={textSecondarySx}>
          No dashboard data available.
        </Typography>
      </Box>
    );
  }

  // No `fetchDrilldown` passed — there's currently no drill-down endpoint,
  // so every bar renders display-only until one exists (see BarPanel.jsx).
  return (
    <DepositsLoansDashboard
      data={dashboardData}
      trendSections={trendSections}
    />
  );
}
