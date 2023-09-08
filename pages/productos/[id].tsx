import ResponsiveAppBar from "@components/home/NavBar";
import {
  Box,
  Button,
  Chip,
  Container,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import { useParsed, useShow } from "@refinedev/core";

import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2
import Image from "next/image";
import { IProduct } from "src/interfaces/products";
import { NumberField, UrlField } from "@refinedev/mui";
import { BookOnline, ConfirmationNumber } from "@mui/icons-material";
import BreadCrumbs from "@components/porducts/BreadCrumbs";
import ReserveModal from "@components/porducts/ReserveModal";
import Head from "next/head";

const Producto = () => {
  const { id } = useParsed();

  const {
    queryResult: { data, isLoading, isError },
  } = useShow<IProduct>({
    resource: "items",
    id,
  });

  const itemData = data?.data;

  console.log(itemData);

  if (isLoading) {
    return (
      <>
        <ResponsiveAppBar />
        <Container maxWidth='lg'>
          <BreadCrumbs />
          <div>Loading...</div>
        </Container>
      </>
    );
  }

  if (isError) {
    return <div>Something went wrong!</div>;
  }
  return (
    <>
      <Head>
        <title>{itemData?.name} - enVenta</title>
      </Head>
      <ResponsiveAppBar />
      <Container maxWidth='lg'>
        <BreadCrumbs />
        <Grid container spacing={2} paddingTop={2}>
          <Grid xs={12} md={8}>
            <Image
              src={itemData?.imageURL!}
              alt={itemData?.name!}
              style={{
                width: "100%",
                height: "auto",
              }}
              width={500}
              height={500}
            />
          </Grid>
          <Grid xs={12} md={4}>
            <Stack>
              <Typography variant='h1' fontSize={24}>
                {itemData?.name}
              </Typography>

              <Box display={"flex"}>
                <Box flex={1}>
                  <Typography variant='caption'>
                    Precio cuendo era nuevo
                    <NumberField
                      fontSize={18}
                      value={itemData?.priceNew!}
                      options={{
                        style: "currency",
                        currency: "MXN",
                        maximumFractionDigits: 0,
                        minimumFractionDigits: 0,
                      }}
                      sx={{ textDecoration: "line-through" }}
                      color={"red"}
                    />
                  </Typography>
                  <Typography variant='caption'>
                    Precio ahora
                    <NumberField
                      fontSize={24}
                      value={itemData?.priceSale!}
                      options={{
                        style: "currency",
                        currency: "MXN",
                        maximumFractionDigits: 0,
                        minimumFractionDigits: 0,
                      }}
                      color={"secondary"}
                    />
                  </Typography>
                </Box>
                <Box
                  display={"flex"}
                  alignItems={"center"}
                  textAlign={"center"}
                >
                  <Chip
                    label={`Usado por ${itemData?.use}`}
                    color='success'
                    sx={{ margin: "1rem 0rem 1rem 0rem" }}
                    variant='outlined'
                  />
                </Box>
              </Box>
              <Box margin={"1rem 0rem 1rem 0rem"}>
                <ReserveModal item={itemData} />
              
              </Box>
              <Divider sx={{ margin: "1rem 0rem 1rem 0rem" }} />

              <Typography
                fontWeight={"bold"}
                variant='h2'
                fontSize={20}
                marginBottom={1}
                color={"Highlight"}
              >
                Marca
              </Typography>
              <Typography whiteSpace={"pre-line"} marginBottom={1}>
                {itemData?.brand}
              </Typography>
              <Typography
                fontWeight={"bold"}
                variant='h2'
                fontSize={20}
                marginBottom={1}
                color={"Highlight"}
              >
                Link de compra original
              </Typography>
              <Typography
                marginBottom={1}
                sx={{
                  textOverflow: "ellipsis",
                  overflow: "hidden",
                  width: "300px",
                  whiteSpace: "nowrap",
                }}
              >
                <a href={itemData?.link} target='_blank'>
                  {itemData?.link}
                </a>
                {/* <UrlField
                  value={itemData?.link}
                  target='_blank'
                  sx={{
                  textOverflow: "ellipsis",
                  overflow: "hidden",
                  width: "250px",
                  whiteSpace: "nowrap",
                }}
                /> */}
              </Typography>

              <Typography></Typography>
            </Stack>
          </Grid>
          <Grid xs={12}>
            <Typography
              fontWeight={"bold"}
              variant='h2'
              fontSize={24}
              marginBottom={1}
              color={"Highlight"}
            >
              Descripción
            </Typography>
            <Typography whiteSpace={"pre-line"}>
              {itemData?.description}
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

Producto.noLayout = true;

export default Producto;
