import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";

import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button } from "@mui/material";
import React, { useState } from "react";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(() => ({
  "&:last-child, &:last-child ": {
    border: 0,
  },
}));
interface ObType {
  name: string;
  id: number;
  holat: boolean;
  vaqt: string;
}

interface Props {
  ob: ObType[];
}

const List: React.FC<Props> = ({ ob }) => {
  const [vl, setVl] = useState<string>("");
  const [i, setI] = useState<number>(0);
  const [aad, setAd] = useState<boolean>(false);
  const [rendr, setRendr] = useState<number>(0);
  console.log(ob);

  let rows = localStorage.getItem("mass")
    ? JSON.parse(localStorage.getItem("mass")!)
    : [...ob];

  console.log(rendr);

  function Check(a: number): void {
    let arr = rows.map(
      (b: {
        name: string;
        holat: boolean;
        id: number;
        vaqt: string;
      }): { name: string; holat: boolean; id: number } =>
        a == b.id ? { ...b, holat: !b.holat } : b
    );
    console.log(arr);
    rows = [...arr];
    localStorage.setItem("mass", JSON.stringify(rows));
  }
  function Delet(x: number) {
    rows = rows.filter(
      (el: { name: string; holat: boolean; id: number; vaqt: string }) =>
        x != el.id
    );
    localStorage.setItem("mass", JSON.stringify(rows));
  }

  function Edit(x: number) {
    let arr = rows.find(
      (b: {
        name: string;
        holat: boolean;
        id: number;
        vaqt: string;
      }): boolean => x == b.id
    );
    console.log(arr);
    setI(x);
    setVl(arr.name);
    setAd(true);
  }

  function Edt() {
    let arr = rows.map(
      (b: {
        name: string;
        holat: boolean;
        id: number;
        vaqt: string;
      }): { name: string; holat: boolean; id: number } =>
        i == b.id ? { ...b, name: vl } : b
    );
    console.log(arr);
    rows = [...arr];
    localStorage.setItem("mass", JSON.stringify(rows));
    setAd(false);
  }

  return (
    <TableContainer
      sx={{
        maxWidth: 800,
        height: 500,
        overflow: "auto",
        border: "1px #000 solid",
      }}
      component={Paper}
    >
      <Table aria-label="customized table">
        <TableBody>
          {rows.map(
            (row: {
              name: string;
              holat: boolean;
              id: number;
              vaqt: string;
            }) => (
              <StyledTableRow key={row.name}>
                <StyledTableCell
                  sx={{ display: "flex", alignItems: "center", gap: "10px" }}
                >
                  <input
                    type="checkbox"
                    style={{ width: "auto" }}
                    checked={row.holat}
                    onClick={() => {
                      Check(row.id);
                      setRendr(Math.random());
                    }}
                  />
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <h3>{row.name}</h3>
                    <p> {row.vaqt}</p>
                  </div>
                </StyledTableCell>
                <StyledTableCell
                  onClick={() => {
                    Delet(row.id);
                    setRendr(row.id);
                  }}
                  align="right"
                >
                  <Button>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      width="18"
                      height="18"
                      fill="rgba(240,83,83,1)"
                    >
                      <path d="M17 6H22V8H20V21C20 21.5523 19.5523 22 19 22H5C4.44772 22 4 21.5523 4 21V8H2V6H7V3C7 2.44772 7.44772 2 8 2H16C16.5523 2 17 2.44772 17 3V6ZM18 8H6V20H18V8ZM9 4V6H15V4H9Z"></path>
                    </svg>
                  </Button>
                </StyledTableCell>
                <StyledTableCell align="right">
                  <Button onClick={() => Edit(row.id)}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      width="18"
                      height="18"
                      fill="rgba(0,0,0,0.41)"
                    >
                      <path d="M5 18.89H6.41421L15.7279 9.57627L14.3137 8.16206L5 17.4758V18.89ZM21 20.89H3V16.6473L16.435 3.21231C16.8256 2.82179 17.4587 2.82179 17.8492 3.21231L20.6777 6.04074C21.0682 6.43126 21.0682 7.06443 20.6777 7.45495L9.24264 18.89H21V20.89ZM15.7279 6.74785L17.1421 8.16206L18.5563 6.74785L17.1421 5.33363L15.7279 6.74785Z"></path>
                    </svg>
                  </Button>
                </StyledTableCell>
              </StyledTableRow>
            )
          )}
        </TableBody>
      </Table>
      <div
        className="modal ed"
        style={{ display: `${!aad ? "none" : "flex"}` }}
        onClick={() => setAd(false)}
      >
        <div className="md" onClick={(e) => e.stopPropagation()}>
          <input
            value={vl}
            onChange={(e) => setVl(e.target.value)}
            className="t"
            type="text"
          />
          <Button variant="contained" sx={{ width: "250px" }} onClick={Edt}>
            Edit
          </Button>
        </div>
      </div>
    </TableContainer>
  );
};

export default List;
