import styles from "./index.module.css";

export default function UrnaEletronica() {
  return (
    <div>
      <div className={styles["urna"]}>
        <div className={styles["tela"]}>
          <div className={styles["d-1"]}>
            <div className={styles["d-1-left"]}>
              <div className={styles["d-1-1"]}>
                <span>SEU VOTO PARA</span>
              </div>
              <div className={styles["d-1-2"]}>
                <span>PRESIDENTE</span>
              </div>
              <div className={styles["d-1-3"]}>
                <div className={`${styles["numero"]} ${styles["pisca"]}`}></div>
                <div className={styles["numero"]}></div>
              </div>
              <div className={styles["d-1-4"]}>
                Nome: FULANO DE TAL <br />
                Partido: IMK <br />
                
              </div>
            </div>
            <div className={styles["d-1-right"]}>
              <div className={styles["d-1-image"]}>
                <img src="images/84.jpg" alt="Imagem Prefeito" />
                Prefeito
              </div>
              
            </div>
          </div>
          <div className={styles["d-2"]}>
            Aperta a tecla: <br />
            CONFIRMA para CONFIRMAR este voto.<br />
            CORRIGE para CORRIGIR este voto.
          </div>
        </div>
        <div className={styles["teclado"]}>
          <div className={styles["teclado--linha"]}>
            <div className={styles["teclado--botao"]}>1</div>
            <div className={styles["teclado--botao"]}>2</div>
            <div className={styles["teclado--botao"]}>3</div>
          </div>
          <div className={styles["teclado--linha"]}>
            <div className={styles["teclado--botao"]}>4</div>
            <div className={styles["teclado--botao"]}>5</div>
            <div className={styles["teclado--botao"]}>6</div>
          </div>
          <div className={styles["teclado--linha"]}>
            <div className={styles["teclado--botao"]}>7</div>
            <div className={styles["teclado--botao"]}>8</div>
            <div className={styles["teclado--botao"]}>9</div>
          </div>
          <div className={styles["teclado--linha"]}>
            <div className={`${styles["teclado--botao"]} ${styles["botao--branco"]}`}>BRANCO</div>
            <div className={`${styles["teclado--botao"]} ${styles["botao--corrige"]}`}>CORRIGE</div>
            <div className={`${styles["teclado--botao"]} ${styles["botao--confirma"]}`}>CONFIRMA</div>
          </div>
        </div>
      </div>
      <script>
        
      </script>
    </div>
  );
}
