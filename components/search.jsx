import styles from "../styles/Home.module.css";
import Image from "next/image";


function Search() {
  return (
    <form
      asp-controller="Home"
      action="search"
      asp-action="Index"
      method="get"
    >
      <section className={styles.input}>
        <div className={styles.searchcontainer}>
          <input type="text" name="query" />
          <button>
            <Image
              src="/lupa.png"
              width={20}
              height={20}
              alt="search-icon"
            />
          </button>
        </div>
      </section>
    </form>
  );
}

export default Search;
