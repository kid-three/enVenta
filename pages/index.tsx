import ItemCard from "@components/home/ItemCard";
import ResponsiveAppBar from "@components/home/NavBar";
import { Container } from "@mui/material";
import { useList, HttpError } from "@refinedev/core";
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2
import { IProduct } from "src/interfaces/products";
import Head from "next/head";

export default function Home() {
  const { data, isLoading, isError } = useList<IProduct, HttpError>({
    resource: "items",
  });

  const products = data?.data ?? [];

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Something went wrong!</div>;
  }

  return (
    <>
      <Head>
        <title>Articulos en Venta</title>
      </Head>
      <ResponsiveAppBar />
      <Container maxWidth='lg'>
        <Grid container spacing={2} paddingTop={2}>
          {products.map((product) => (
            <ItemCard item={product} />
          ))}
        </Grid>
      </Container>
    </>
  );
}

Home.noLayout = true;
