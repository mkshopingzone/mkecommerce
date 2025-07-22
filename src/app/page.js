import PreLoginNav from "./components/MainNav";
import Header from "./components/Header";
import BenefitsSection from "./components/BenefitsSection";
import EmpowerSection from "./components/EmpowerSection";
import SellerSuccess from "./components/SellerSuccess";
import SellerFooter from "./components/SellerFooter";

export default function Home() {
  return (
     <>
      <PreLoginNav/>
      <Header/>
      <BenefitsSection/>
      <EmpowerSection/>
      <SellerSuccess/>
      <SellerFooter/>
     </>
  );
}