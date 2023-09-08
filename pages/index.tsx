import ItemCard from "@components/home/ItemCard";
import ResponsiveAppBar from "@components/home/NavBar";
import { Container } from "@mui/material";
import { useList, HttpError } from "@refinedev/core";
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2
import { IProduct } from "src/interfaces/products";
import Head from "next/head";
import { dataProvider } from "src/providers/supabase";
import { supabaseClient } from "src/utility";

export const getServerSideProps = async () => {
  const { data } = await dataProvider(supabaseClient).getList({
    resource: "items",
    pagination: {
      pageSize: 50,
    },
  });

  return {
    props: {
      products: data,
    },
  };
};

export default function Home({ products }: any) {
  // const { data, isLoading, isError } = useList<IProduct, HttpError>({
  //   resource: "items",
  //   pagination: {
  //     pageSize: 50,
  //   },
  // });

  // const products = data?.data ?? [];

  // if (isLoading) {
  //   return <div>Loading...</div>;
  // }

  // if (isError) {
  //   return <div>Something went wrong!</div>;
  // }
  console.log(products);

  return (
    <>
      <Head>
        <title>Articulos en Venta</title>
      </Head>
      <ResponsiveAppBar />
      <Container maxWidth='lg'>
        {!products ? (
          <div>Loading</div>
        ) : (
          <Grid container spacing={2} paddingTop={2}>
            {products.map((product: any) => (
              <ItemCard key={product.id} item={product} />
            ))}
          </Grid>
        )}
      </Container>
    </>
  );
}

Home.noLayout = true;
