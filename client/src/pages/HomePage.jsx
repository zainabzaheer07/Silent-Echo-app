import React from 'react'
import styles from "../PagesStyles/HomePage.module.css";
import { NavLink } from 'react-router-dom';

import Footer from '../components/Footer/Footer';
function HomePage() {
  return (

    <>
    <main className={styles.HomePageContainer} >
<section className={styles.HomePageContentSection} >

<div className={styles.heroLineText}>
<h1>
Compassion, Understanding and Love, <br />
all we need is a “sign.”
</h1>
</div>
<section className={styles.conversationSection} >
<div className={styles.leftSectionComplete} >
<div className={styles.leftSection} >
<h3 className={styles.featureHeading} >Conversation</h3>
<p className={styles.description} >

Conversation with your loved ones who use sign language, in real time, now made possible.
Try our latest real time translation tool.
</p>
</div>
<NavLink to="/conversation" >
<button className={styles.navigationButton}>
    converse
</button>
</NavLink>
</div>
<figure className={styles.rightSectionFigure} >
<img src="./images/conversation-section-img.png" alt="" />
</figure>
</section>

{/* learning section */}
<section className={styles.conversationSection} style={{backgroundColor:"#118AB2"}}>
<div className={styles.leftSectionComplete} >
<div className={styles.leftSection} >
<h3 className={styles.featureHeading} >Learning:</h3>
<p className={styles.description} >
Want to learn sign language? Dive deep as our learning module takes you through the basics of sign language.
</p>
</div>
<NavLink to="/learn" >
<button className={styles.navigationButton}>
    Learn
</button>
</NavLink>
</div>
<figure className={styles.rightSectionFigure} >
<img src="./images/Learning-section-image.png" alt="" />
</figure>
</section>
{/* meet the team */}
<section className={styles.conversationSection} style={{backgroundColor:"#FFD166"}} >
<div className={styles.leftSectionComplete} >
<div className={styles.leftSection} >
<h3 className={styles.featureHeading} style={{color:"#073B4C"}}>Meet the Team:</h3>
<p className={styles.description} style={{color:"#073B4C"}}>

Who are we and why did we chose such a project. Find out about us.
</p>
</div>
<NavLink to="/about-us" >
<button className={styles.navigationButton}>
    About Us
</button>
</NavLink>
</div>
<figure className={styles.rightSectionFigure} >
<img src="./images/meet-the-team-section-img.png" alt="" />
</figure>
</section>
{/*  <------------------meet the team, ends here------------------> */}

</section>

    </main>

    <div style={{marginTop:"15px"}}>
  <Footer/>
</div>
    </>


  )
}

export default HomePage