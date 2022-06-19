import styles from "../styles/Home.module.css";


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
            <img
              src="https://cdn.pixabay.com/photo/2017/01/13/01/22/magnifying-glass-1976105_960_720.png"
              width="20px"
              alt="search-icon"
            />
          </button>
        </div>
      </section>
      <section className={styles.checkbox}>
        <input type="radio" name="source" value="scholar"/> Google Scholar
        <input type="radio" name="source" value="lpsm" /> LPSM
      </section>
    </form>
  );
}

export default Search;
