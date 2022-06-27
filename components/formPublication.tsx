import styles from "../styles/Home.module.css";
import { Dispatch, SetStateAction } from "react";

function FormPublication({
  setState,
}: {
  setState: Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <div className={styles.formpublication}>
      <form
        asp-controller="Home"
        action="search"
        asp-action="Index"
        method="post"
      >
        <h2>Add publication</h2>
        <p>
          The publication you are creating will be associated with the current
          bacteria.
        </p>
        <label>
          Title:
          <input type="text" id="title" />
        </label>
        <label>
          URL:
          <input type="text" id="url" />
        </label>
        <label>
          Abstract:
          <input type="text" id="abstract" />
        </label>
        <label>
          Author:
          <input type="text" id="author" />
        </label>
        <label>
          Publication day:
          <input type="text" id="pub_year" />
        </label>
        <div>
          <button onClick={() => setState(false)}>Cancelar</button>
          <input type="submit" value="Submit" />
        </div>
      </form>
    </div>
  );
}

export default FormPublication;
