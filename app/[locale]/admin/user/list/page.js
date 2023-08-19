import React from "react";
import { useTranslations,useLocale } from "next-intl";
import MyTitle from "@/app/[locale]/components/common/MyTitle";
import UserListClient from "@/app/[locale]/components/admin/user/UserListClient";
function page() {
  const t = useTranslations();
  const locale=useLocale()
  const traslations ={
    table: {
        username: t("user.userName"),
        password:t("Common.password"),
        idPerson:t("user.idPerson"),
        idProfile:t("user.idProfile"),
        active:t("user.active")
    },
    search:t("Account.table.search"),
    title:t("Nav.administration.user") ,
    noResultsFound:t("Common.noResultsFound"),
    loadingData:t('Common.loadingData'),
    errorMsg:t('Common.errorOccurred')
  }
  return (
    <>
      <div className="d-flex justify-content-center align-items-center m-4">
        <div className="col-lg-10">
          <MyTitle title={t("Nav.administration.userList")} />
        </div>
      </div>
      <div className="d-flex justify-content-center align-items-center">
        <div className="card col-lg-10 shadow">
          <div className="container mt-4 mb-4">
             <UserListClient traslations={traslations} locale={locale}/>
          </div>
        </div>
      </div>
    </>
  );
}

export default page;
