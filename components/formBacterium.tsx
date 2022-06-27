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
        <h2>Add new bacteria</h2>
        <label>
          Domain:
          <input type="text" id="domain" />
        </label>
        <label>
          Phylum
          <input type="text" id="phylum" />
        </label>
        <label>
          Class:
          <input type="text" id="class" />
        </label>
        <label>
          Order:
          <input type="text" id="order" />
        </label>
        <label>
          Family:
          <input type="text" id="family" />
        </label>
        <label>
          Genus:
          <input type="text" id="genus" />
        </label>
        <label>
          Species:
          <input type="text" id="species" />
        </label>
        <label>
          Full scientific name:
          <input type="text" id="full-scientific-name" />
        </label>
        <label>
          Family:
          <input type="text" id="family" />
        </label>
        <label>
          Synonyms:
          <input type="text" id="synonyms" />
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
