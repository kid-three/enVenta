import { MuiListInferencer } from "@refinedev/inferencer/mui";
import { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { authProvider } from "src/authProvider";

import React from "react";
import {
  useDataGrid,
  EditButton,
  ShowButton,
  DeleteButton,
  List,
  DateField,
} from "@refinedev/mui";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import {
  IResourceComponentsProps,
  useTranslate,
  useMany,
} from "@refinedev/core";

export const ReservaList: React.FC<IResourceComponentsProps> = () => {
  const translate = useTranslate();
  const { dataGridProps } = useDataGrid();

  const { data: itemData, isLoading: itemIsLoading } = useMany({
    resource: "items",
    ids: dataGridProps?.rows?.map((item: any) => item?.itemId) ?? [],
    queryOptions: {
      enabled: !!dataGridProps?.rows,
    },
  });

  const columns = React.useMemo<GridColDef[]>(
    () => [
      {
        field: "id",
        headerName: "ID",
        type: "number",
        minWidth: 50,
      },

      {
        field: "itemId",
        flex: 1,
        headerName: "Producto",
        minWidth: 300,
        renderCell: function render({ value }) {
          return itemIsLoading ? (
            <>Loading...</>
          ) : (
            itemData?.data?.find((item) => item.id === value)?.name
          );
        },
      },
      {
        field: "name",
        flex: 1,
        headerName: "Nombre",
        minWidth: 200,
      },
      {
        field: "phone",
        flex: 1,
        headerName: "Telefono",
        type: "number",
        minWidth: 200,
      },
    ],
    [translate, itemData?.data]
  );

  return (
    <List>
      <DataGrid {...dataGridProps} columns={columns} autoHeight />
    </List>
  );
};

export default ReservaList;

export const getServerSideProps: GetServerSideProps<{}> = async (context) => {
  const { authenticated, redirectTo } = await authProvider.check(context);

  const translateProps = await serverSideTranslations(context.locale ?? "en", [
    "common",
  ]);

  if (!authenticated) {
    return {
      props: {
        ...translateProps,
      },
      redirect: {
        destination: `${redirectTo}?to=${encodeURIComponent("/reservas")}`,
        permanent: false,
      },
    };
  }

  return {
    props: {
      ...translateProps,
    },
  };
};
