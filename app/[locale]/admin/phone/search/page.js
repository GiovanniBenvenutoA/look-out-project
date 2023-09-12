import React from "react";
import { useTranslations, useLocale } from "next-intl";
import MyTitle from "@/app/[locale]/components/common/MyTitle";
import ListPhone from "@/app/[locale]/components/admin/phone/ListPhone";
function page() {
  const t = useTranslations();
  const locale = useLocale();
  return (
    <>
      <div className="d-flex justify-content-center align-items-center m-4">
        <div className="col-lg-10">
          <MyTitle title={t("Nav.administration.userList")} />
        </div>
      </div>
      <div className="d-flex justify-content-center align-items-center">
        <div className="card col-lg-10 shadow">
          <div className="card-cody mt-3 mb-3">
            <div className="container">
            <ListPhone locale={locale}/>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default page;
