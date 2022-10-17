import FormOracleAddStaff from "@/components/FormOracleAddStaff";
import FormOracleGitcoinAccountStatusEnable from "@/components/FormOracleGitcoinAccountStatusEnable";
import { Main } from "@/templates/Main";
import { Meta } from "@/templates/Meta";
import { AppConfig } from "@/utils/AppConfig";

const Index = () => {
  return (
    <Main
      meta={
        <Meta
          title={`${AppConfig.title} | ${AppConfig.description}`}
          description={AppConfig.description}
        />
      }
    >
      <section className="bg-emerald-700 text-white py-8">
        <div className="container mx-auto flex items-center justify-between">
          <span className="font-normal text-4xl m-0">Admin</span>
          <span className="font-normal font-Secondary text-xl m-0">
            Minimal Viable Dashboard
          </span>
        </div>
      </section>
      <AdminForms />
    </Main>
  );
};

const AdminForms = (props) => {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4 ">
        <h3 className="font-normal text-3xl">Gitcoin Grantee Oracle</h3>
        <FormOracleGitcoinAccountStatusEnable />
        <div className="my-20" />
        <h3 className="font-normal text-3xl">Add Staff</h3>
        <FormOracleAddStaff />
        {/* <h3 className="font-normal text-3xl">Remove Staff</h3> */}
        {/* <FormOracleAddStaff /> */}
      </div>
    </section>
  );
};

export default Index;
