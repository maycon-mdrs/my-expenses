import { DataType } from "@/types/DataType";

/**
 * Armazena os detalhes do usuário no localStorage.
 * @param user As informações do usuário a serem armazenadas. Pode ser null para remover o usuário do armazenamento.
 */
export function setDataLocalStorage(data: DataType[]) {
    localStorage.setItem("data", JSON.stringify(data));
}

export function deleteDataLocalStorage () {
    localStorage.removeItem("data");
}

/**
 * Obtém as informações do usuário armazenadas no localStorage.
 * @returns As informações do usuário armazenadas, ou null se não houver usuário armazenado.
 */
export function getDataLocalStorage (): DataType[] | null {
    const json = localStorage.getItem("data");

    if (!json) return null;

    const data = JSON.parse(json);
    return data ?? null;
}
