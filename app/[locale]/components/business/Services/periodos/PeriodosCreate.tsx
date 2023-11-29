
import React, { useState, useEffect } from "react";
import PeriodosProyecto from '@/app/api/models/proyecto/PeriodosProyecto';
import { useFormik } from 'formik';
import TableMaterialUI from '../../../common/TablaMaterialUi';
import { Button } from 'react-bootstrap';
import { FaLockOpen } from 'react-icons/fa';
import { periodoApiUrl, periodoGetByIdProyectoApiUrl } from '@/app/api/apiConfig';
import { handleFormSubmit, fetchData } from '@/app/[locale]/utils/Form/UtilsForm';
function PeriodosCreate({ t, periodo, isButtonDisabled, idService }) {
  const validationSchema = PeriodosProyecto.getValidationSchema(t);
  const [periodos, setPeriodos] = useState([]);
  const apiurl = {
    edit: "",
    create: periodoApiUrl,
  };
  const formik = useFormik({
    initialValues: periodo,
    validationSchema,
    //validateOnMount: true,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        console.log(periodo)
        // Utiliza una variable para almacenar la función handleFormSubmit
        await handleFormSubmit(periodo, t, null, false, null, apiurl);
        await fetchPeriodo();
      } catch (error) {
        console.error("Error in handleFormSubmit:", error);
      } finally {
        setSubmitting(false); // Importante para indicar que el formulario ya no está siendo enviado.
      }
    },
  });
  /**
 * @returns {Promise<Array>} Retorna un arreglo de periodoproyecto
 */
  const fetchPeriodo = async () => {
    try {
      const data = await fetchData(`${periodoGetByIdProyectoApiUrl}/${idService}`);
      const periodos = data as PeriodosProyecto[];

      const dataWithActions = periodos.map((periodo) => ({
        ...periodo,
        fechaPeriodoDesde:new PeriodosProyecto(periodo).getPeriodoCompleto(),
        actions: (
          <Button variant="link">
            <FaLockOpen size={16} className="my-anchor-element" />
            {/* <Tooltip anchorSelect=".my-anchor-element" place="top">
              {t.Common.unassign}
            </Tooltip> */}
          </Button>
        ),
      }));
      console.log(data)
      setPeriodos(dataWithActions);
    } catch (error) {
      console.error('Error al obtener periodos:', error);
      return []; // En caso de error, retorna un arreglo vacío
    }
  };
  useEffect(() => {
    fetchPeriodo();
  }, [])

  // const dataWithActions = periodos
  //   ? periodos.map((periodo) => ({
  //     ...periodo,
  //     actions: (
  //       <Button variant="link">
  //         <FaLockOpen size={16} className="my-anchor-element" />
  //         {/* <Tooltip anchorSelect=".my-anchor-element" place="top">
  //           {t.Common.unassign}
  //         </Tooltip> */}
  //       </Button>
  //     ),
  //   }))
  //   : [];

  return (
    <>
      <form onSubmit={(e) => {
        formik.handleSubmit(e);
      }}>
        <div className="d-flex justify-content-end mb-3">
          <button type="submit" className="text-end  btn btn-primary" disabled={isButtonDisabled()}>
            Pre-cierre
          </button>
        </div>
      </form>
      <TableMaterialUI columns={PeriodosProyecto.createColumns(t)} data={periodos} />
    </>
  )
}

export default PeriodosCreate