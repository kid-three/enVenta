import React from "react";
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Divider,
  Typography,
} from "@mui/material";

import { NumberField } from "@refinedev/mui";
import Link from "next/link";

const ItemCard = ({ item }: any) => {
  const { name, description, imageURL, priceNew, priceSale, id } = item;
  return (
    <Grid xs={6}>
      <Card>
        <CardMedia
          sx={{
            height: {
              xs: 120,
              md: 400,
            },
          }}
          image={imageURL}
          title={name}
        />
        <CardContent>
          <Typography gutterBottom variant='body2' component='div'>
            {name}
          </Typography>
          <Divider sx={{ margin: "1rem 0rem 1rem 0rem" }} />
          <Typography variant='body2' fontWeight={"bold"}>
            Precio original
          </Typography>
          <Typography sx={{ textDecoration: "line-through" }} color={"red"}>
            <NumberField
              value={priceNew}
              options={{
                style: "currency",
                currency: "USD",
                maximumFractionDigits: 0,
                minimumFractionDigits: 0,
              }}
            />
          </Typography>
          <Typography variant='body2' fontWeight={"bold"}>
            Precio venta
          </Typography>
          <Typography>
            {" "}
            <NumberField
              value={priceSale}
              options={{
                style: "currency",
                currency: "USD",
                maximumFractionDigits: 0,
                minimumFractionDigits: 0,
              }}
            />
          </Typography>
        </CardContent>
        <CardActions>
          <Link href={`/productos/${id}`} passHref>
            <Button size='small' fullWidth>
              Ver detalles
            </Button>
          </Link>
        </CardActions>
      </Card>
    </Grid>
  );
};

export default ItemCard;
