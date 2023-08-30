import React from "react";
import NotificationSweet from "@/app/[locale]/components/common/NotificationSweet";
import ConfirmationDialog from "@/app/[locale]/components/common/ConfirmationDialog";
import {
  clientApiUrl,
  clientCreateApiUrl,
  apiHeaders,
  clientDeleteApiUrl,
  clientUpdatepiUrl
} from "@/app/api/apiConfig";
import axios from "axios";
export const handleClientInputChange = (formData, setFormData) => (event) => {
  const { name, value } = event.target;
  setFormData((prevData) => ({
    ...prevData,
    [name]: value,
  }));
};

export const handleClientFormSubmit =
  (formData, translations, push, isEditMode = false) =>
  async (event) => {
    event.preventDefault();
    try {
      console.log(formData)
      const clienteWithIds = {
        cliente: {
          cliNombre: formData.cliNombre,
          cliDescripcion: formData.cliDescripcion,
          eclId: formData.eclId,
          paiId: formData.paiId,
          secId: formData.secId,
          girId: formData.girId,
          cliSitioWeb: formData.cliSitioWeb,
          cliNif: formData.cliNif,
        },
        idPerson: formData.idPerson,
      };
      //console.log(clientUpdatepiUr)
      const url = isEditMode
        ? `${clientUpdatepiUrl}/${formData.cliId}`
        : `${clientCreateApiUrl}`;
      const method = isEditMode ? "PUT" : "POST";
      await NotificationSweet({
        title: isEditMode
          ? translations.notification.loading.title
          : translations.notification.create.title,
        text: isEditMode
          ? translations.notification.loading.text
          : translations.notification.create.text,
        type: isEditMode
          ? translations.notification.loading.type
          : translations.notification.create.type,
        showLoading: true,
      });
      const response = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(clienteWithIds),
      });
      if (response.ok) {
        NotificationSweet({
          title: translations.notification.success.title,
          text: translations.notification.success.text,
          type: translations.notification.success.type,
          push: push,
          link: "/account/search",
        });
      } else if (response.status === 409) {
        NotificationSweet({
          title: translations.notification.warning.title,
          text: translations.client.clientNameExist,
          type: translations.notification.warning.type,
          push: push,
          link: isEditMode
            ? `/account/edit/${formData.cliId}`
            : "/account/create",
        });
      } else {
        throw e;
      }
    } catch (error) {
      NotificationSweet({
        title: translations.notification.error.title,
        text: translations.notification.error.text,
        type: translations.notification.error.type,
        push: push,
        link: "/account/search",
      });
      console.error("Error sending data:", error);
      // router.push('');
    }
  };

  export const handleClienteDelete = async (idClient,trans,fechtClients) => {
    const confirmed = await ConfirmationDialog(
      trans.notification.deleting.title,
      trans.notification.deleting.text,
      trans.notification.deleting.type,
      trans.notification.deleting.buttonOk,
      trans.notification.deleting.buttonCancel
    );
    if (confirmed) {
      await NotificationSweet({
        title: trans.notification.loading.title,
        text: "",
        type: trans.notification.loading.type,
        showLoading: true,
      });
      try {
        const response = await axios.delete(`${clientDeleteApiUrl}/${idClient}`); // Utiliza Axios para hacer la solicitud DELETE
        if (response.data.isSuccess) {
          NotificationSweet({
            title: trans.notification.success.title,
            text: trans.notification.success.text,
            type: trans.notification.success.type,
          });
          // Actualiza la lista de usuarios después de eliminar
          fechtClients();
        } else {
          NotificationSweet({
            title: trans.notification.error.title,
            text: trans.notification.error.text,
            type: trans.notification.error.type,
          });
        }
      } catch (error) {
        console.log(error)
        NotificationSweet({
          title: trans.notification.error.title,
          text: trans.notification.error.text,
          type: trans.notification.error.type,
        });
      }
    }
  };
export const handleEdit = async (userId,trans,push) => {
  const confirmed = await ConfirmationDialog(
    trans.notification.edit.title,
    trans.notification.edit.text,
    trans.notification.edit.type,
    trans.notification.edit.buttonOk,
    trans.notification.edit.buttonCancel
  );
  if (confirmed) {
    push(`/account/edit/${userId}`)
  }
};

export const fetchGetbyId= async (idClient)=>{
  try {
    const response = await fetch(
      `${clientApiUrl}/${idClient}`
    );
    return response;
  } catch (error) {
    console.error('Error fetching data:', error);
    return [];
  }
};