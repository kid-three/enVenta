import React, { useState } from "react";

import { HttpError, useModal } from "@refinedev/core";
import { Close, ConfirmationNumber } from "@mui/icons-material";
import { Box, Button, Typography, TextField } from "@mui/material";
import Modal from "@mui/material/Modal";
import { useForm } from "@refinedev/react-hook-form";
import { useParsed } from "@refinedev/core";

interface FormValues {
  id: number;
  name: string;
  phone: string;
}

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 350,
  bgcolor: "background.paper",
  borderRadius: "10px",
  // border: "2px solid #000",
  boxShadow: 5,
  p: 3,
  paddingTop: 1,
};

const ReserveModal = ({ item }: any) => {
  const { name, description, imageURL, priceNew, priceSale, id: itemId } = item;

  const { visible, show, close } = useModal();

  const { id } = useParsed();

  const {
    refineCore: { onFinish, formLoading, queryResult },
    register,
    handleSubmit,
    resetField,
    formState: { errors },
  } = useForm({
    refineCoreProps: {
      action: "create",
      resource: "reservas",
      successNotification: (data, values, resource) => {
        return {
          description: `Información enviada`,
          message: "Nos pondremos en contacto contigo brevemente",
          type: "success",
        };
      },
      onMutationSuccess: (data, variables, context, isAutoSave) => {
        close();
      },
    },
  });

  return (
    <>
      <Button
        fullWidth
        variant='contained'
        color='primary'
        size='large'
        startIcon={<ConfirmationNumber />}
        onClick={show}
      >
        Reservar ahora
      </Button>
      {visible && (
        <Modal
          open={visible}
          onClose={close}
          aria-labelledby='modal-modal-title'
          aria-describedby='modal-modal-description'
        >
          <Box sx={style}>
            {/* <Box textAlign={"right"}>
              <Close fontSize='small'/>
            </Box> */}
            <Typography id='modal-modal-title' variant='h6' component='h2'>
              {name}
            </Typography>
            <Typography id='modal-modal-description' sx={{ mt: 2, mb: 2 }}>
              ¿Te interesa este artículo?
              <br />
              Por favor danos tu nombre y tu telefono para negociar o escribe
              por whatsapp a{" "}
              <a
                href={`https://wa.me/525611119599?text=Me%20interesa%20comprar%20${encodeURIComponent(
                  name
                )}`}
              >
                +52 56 1111 9599
              </a>
            </Typography>

            <Box
              component='form'
              sx={{ display: "flex", flexDirection: "column" }}
              autoComplete='off'
              onSubmit={handleSubmit(onFinish)}
            >
              <TextField
                {...register("name", {
                  required: "This field is required",
                })}
                // error={!!(errors as any)?.name}

                margin='normal'
                fullWidth
                InputLabelProps={{ shrink: true }}
                type='text'
                label='Nombre completo'
                name='name'
              />
              {errors.name && (
                <Typography fontSize={12} color={"error"}>
                  Este campo es requerido
                </Typography>
              )}
              <TextField
                {...register("phone", {
                  required: "This field is required",
                })}
                margin='normal'
                fullWidth
                InputLabelProps={{ shrink: true }}
                type='text'
                label='Telefono de contacto'
                name='phone'
              />
              {errors.name && (
                <Typography fontSize={12} color={"error"}>
                  Este campo es requerido
                </Typography>
              )}
              <input
                type='hidden'
                value={itemId}
                {...register("itemId", { required: true })}
              />
              {/* <input type='submit' disabled={formLoading} value='Submit' /> */}
              <Button type='submit' variant='contained'>
                Enviar Info
              </Button>
            </Box>
          </Box>
        </Modal>
      )}
    </>
  );
};

export default ReserveModal;
