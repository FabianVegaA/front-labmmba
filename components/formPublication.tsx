import styles from "../styles/Home.module.css";
import Image from "next/image";
function formPublication() {
  return (
    <form
      asp-controller="Home"
      action="search"
      asp-action="Index"
      method="get"
      className={styles.formpublication}
    >
      <section className={styles.input}>
        <div className={styles.searchcontainer}>
          <input type="text" name="query" />
          <button>
            <Image src="/lupa.png" width={20} height={20} alt="search-icon" />
          </button>
        </div>
      </section>
      <section className={styles.checkbox}>
        <input type="radio" name="source" value="scholar" /> Google Scholar
        <input type="radio" name="source" value="lpsm" /> LPSM
      </section>
    </form>
  );
}

export default formPublication;
