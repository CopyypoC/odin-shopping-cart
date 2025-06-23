import styles from "./Home.module.css";

export function Home() {
  return (
    <div className={styles.homeContainer}>
      <img
        src="/hero.jpg"
        alt="Two fashionable purses"
        className={styles.hero}
      />
      <p className={styles.heroText}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas, in
        ab. Nostrum atque harum ducimus. Repudiandae, voluptate omnis. Possimus
        vero eveniet voluptates? Fugiat, debitis voluptate! Ut excepturi sunt
        mollitia sapiente eum. Sunt modi blanditiis delectus aliquam illum,
        voluptates totam iure nulla, temporibus quae maxime repudiandae, saepe
        quam? Assumenda, laboriosam voluptates. Soluta iure qui eos officia
        officiis corrupti facere, in suscipit eum eaque dolorem quas cum odit.
        Cumque doloremque quo, ea unde perspiciatis dignissimos placeat officia
        harum amet at ex accusantium!
      </p>
    </div>
  );
}
