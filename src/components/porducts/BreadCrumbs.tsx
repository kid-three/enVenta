import { Home } from "@mui/icons-material";
import {
  Breadcrumbs,
  Typography,
  Button,
  Link as MuiLink,
} from "@mui/material";
import NextLink from "next/link";
import React from "react";

const BreadCrumbs = () => {
  return (
    <Breadcrumbs aria-label='breadcrumb' sx={{ marginTop: 1 }}>
      <MuiLink
        component={NextLink}
        prefetch={false}
        sx={{ display: "flex", alignItems: "center" }}
        color='inherit'
        href='/'
      >
        <Home sx={{ mr: 0.5 }} fontSize='inherit' />
        Inicio
      </MuiLink>
    </Breadcrumbs>
  );
};

export default BreadCrumbs;
