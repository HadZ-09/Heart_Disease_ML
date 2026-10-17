  import { useState } from 'react';
import Disease from './Disease_parameter'
  import Header from './Header'
  
  import './app.css'
  function App() {
    const ml_train_parameter=["age","sex","cp","trestbps","chol","fbs","restecg","thalach","exang","oldpeak","slope","ca","thal"]
    const heartFactsProps = [
      {
        quote: "Independent Electrical System",
        desc: "The heart generates its own electrical impulses, allowing it to beat outside the body if supplied with adequate oxygen."
      },
      {
        quote: "Daily Pumping Output",
        desc: "Every day, the heart beats roughly 100,000 times and pumps about 2,000 gallons (7,500 liters) of blood."
      },
      {
        quote: "Sex Specific Attack Symptoms",
        desc: "Women often experience subtle heart attack symptoms like fatigue, nausea, and back pain, rather than classic crushing chest pain."
      },
      {
        quote: "Monday Heart Attack Spike",
        desc: "Heart attacks peak on Monday mornings due to the stress of starting the workweek, which elevates cortisol and blood pressure."
      },
      {
        quote: "Blood Type Risk Factor",
        desc: "Individuals with type A, B, or AB blood have a slightly higher risk of coronary heart disease compared to those with type O."
      },
      {
        quote: "Ancient History Of Disease",
        desc: "Atherosclerosis is not just modern; CT scans show evidence of hardened arteries in 3,000-year-old ancient Egyptian mummies."
      },
      {
        quote: "Broken Heart Syndrome Reality",
        desc: "Severe emotional stress can trigger Takotsubo Cardiomyopathy, stunning the heart muscle and mimicking a real heart attack."
      },
      {
        quote: "Laughter Benefits Vessels",
        desc: "Laughter releases endorphins that expand the inner lining of blood vessels, increasing blood flow by up to 20%."
      },
      {
        quote: "Dental Health Connection",
        desc: "Gum disease allows oral bacteria to enter the bloodstream, driving systemic inflammation and arterial plaque buildup."
      },
      {
        quote: "Rarity Of Heart Cancer",
        desc: "Primary heart cancer is extremely rare because heart muscle cells stop dividing early in life, limiting cancerous mutations."
      }
    ];
    const [num,setNum]=useState(0)
    function changeNum(){
      let random_num=Math.floor(Math.random()*heartFactsProps.length);
      setNum(random_num)
    }
    return(
      <>
      
      <div className='header'>
        <Header facts={heartFactsProps}></Header>
      </div>
      <div>
        <Disease ml_param={ml_train_parameter}></Disease>
      </div>
      
      
      </>
    )
  }
  export default App

