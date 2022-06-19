import styles from "../styles/Home.module.css";


function Search() {
  return (
    <form
      asp-controller="Home"
      action="bacterium"
      asp-action="Index"
      method="get"
    >
      <section className={styles.input}>
        <div className={styles.searchcontainer}>
          <input type="text" name="name" />
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
        <input type="checkbox" name="google-schollar" />
        Google Schollar
        <input type="checkbox" name="lpsm" /> LPSM
      </section>
    </form>
  );
}

export default Search;
