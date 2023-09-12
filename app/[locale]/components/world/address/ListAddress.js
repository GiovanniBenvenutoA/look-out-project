"use client";
import React, { useState, useEffect } from "react";
import {
    handleEdit,
    handleDelete,
    fetchPhone,
    handleView,
  } from "@/app/[locale]/utils/address/UtilsAddress";
import CommonActionsButton from "@/app/[locale]/components/common/CommonActionsButtons";
import ErroData from "@/app/[locale]/components/common/ErroData";
import LoadingData from "@/app/[locale]/components/common/LoadingData";
function ListEmail() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [data, setData] = useState([]);
  let t = require(`@/messages/${locale}.json`);
  const router = useRouter();
  const columns = [
    { title: "ID", key: "emaId" },
    { title: t.Common.phone, key: "emaEmail" },
    { title: t.Account.type, key: "temId" },
    { title: t.Common.name, key: "perId" },
    { title: t.Common.account, key: "cliId" },
    { title: t.user.active, key: "emaVigente" },
    {
      title: t.Account.select,
      key: "actions",
      render: (item) => (
        <CommonActionsButton
          id={item.emaId}
          onDelete={() => handleDelete(item.cliId,translations,fechtClients)}
          onEdit={() => handleEdit(item.cliId,translations,router.push)}
          onView={()=>handleView(item.cliId,router.push)}
        />
      ),
    },
  ];
  const fetchList = async () => {
    try {
      setIsLoading(true);
      const response = await fetchPhone();
      setData(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching phone data:", error);
      setError(true);
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchList();
  }, []);
  return (
    <>
    {isLoading ? (
      <LoadingData loadingMessage={t.Common.loadingData} />
    ) : error ? (
      <ErroData message={t.Common.errorMsg} />
    ) : data.length === 0 ? ( // Verifica si no hay datos
      <div className="text-center justify-content-center align-items-center">
        <h4>{t.Common.phones}</h4> {t.Common.noData}
      </div>
    ) : (
      <TableCommon
        columns={columns}
        noResultsFound={t.Common.noResultsFound}
        data={data}
        title={t.Common.phones}
        search={t.Account.table.search}
      />
    )}
  </>
  )
}

export default ListEmail