import { useEffect, useState } from "react";
import axios from 'axios';
import icon5 from '../assets/icon5.svg';
import icon6 from '../assets/icon6.svg';
// import line1 from '../assets/line1.svg';

interface Rows {
  id: number;
  level: number,
  rowName: string;
  total: number;
  salary: number,
  mimExploitation: number;
  machineOperatorSalary: number;
  materials: number;
  mainCosts: number;
  supportCosts: number;
  equipmentCosts: number;
  overheads: number;
  estimatedProfit: number;
  child: Rows[];
  parentId: number | null;
  childCount: number;
}
interface InputsFileds {
  rowName: string;
  salary: number,
  equipmentCosts: number;
  overheads: number;
  estimatedProfit: number;
}

const Table = (props: any) => {
  let initRow: InputsFileds = {
    equipmentCosts: 0,
    estimatedProfit: 0,
    overheads: 0,
    rowName: "",
    salary: 0,
  };

  const [newRowObj, setNewRowObj] = useState<InputsFileds>(initRow);
  const [rows, setRows] = useState<Rows[]>([]);
  const [ind, setInd] = useState<Boolean>(false);
  const [updForm, setUpdForm] = useState<Boolean[]>();


  // GET ALL CHILDRENS AND DEFINE LEVELS
  function getAllChilds(arr: [Rows]) {
    let result: any = [];
    let level: number = 0;
    let parentId: number | null = null;
    arr.forEach(elem => {
      level = 0;
      parentId = null;
      addElem(elem)
    });


    function addElem(elem: any) {
      if (elem.child.length > 0) {
        let { child, ...rest } = elem;
        rest.level = level;
        rest.parentId = parentId;
        child.parentId = elem.id;
        parentId = elem.id;
        level++;
        result.push(rest);
        child.forEach((item: any) => {
          addElem(item)
        });
        level--;
      } else {
        elem.level = level;
        elem.parentId = parentId;
        result.push(elem);
      }
    }
    
    for (let i = 0; i < result.length; i++) {
      result[i].childCount = 0;
      for (let j = i + 1; j < result.length; j++) {
        if (result[i].level < result[j].level) {
          result[i].childCount = result[i].childCount + 1;
        } else {
          j = result.length
        }
      }
    }
    return result;
  };

  // GET ALL ROWS
  async function getInfo() {
    try {
      const response = await axios.get(`http://185.244.172.108:8081/v1/outlay-rows/entity/${props.entity}/row/list`);
      let newData: any = getAllChilds(response.data);
      setRows(newData);
      setUpdForm(new Array(newData.length).fill(false));
    } catch (error) {
      console.error(error);
    }
  };

  // SET MODE FOR UPDATE ROW OR ADD NEW ROW
  const setUpdateMode = (idx: number | null, addrowInd:Boolean) => {
    if (idx === null) {
      setUpdForm(new Array(rows.length).fill(false));
    } else if (!addrowInd) {
      let newArr = updForm?.map((item, i) => idx === i ? !item : false);
      setUpdForm(newArr);
    } else {
      let newArr = new Array(idx).fill(false).map((item, i) => idx-1 === i ? true : item);
      setUpdForm(newArr);
    }
  };

  // GET INPUT VALUE FOR ADD ROW
  const handleOnChange = (name: any, e: any) => {
    let newObj = { ...newRowObj, [name]: e.target.value };
    setNewRowObj(newObj);
  };

  // GET INPUT VALUE FOR UPDATE ROW
  const handleOnChange1 = (name: any, e: any, idx: number) => {
    // let newObj = {...newRowObj, [name]: e.target.value};
    let newObj = rows.map((item, i) => i === idx ? ({ ...item, [name]: e.target.value }) : item)
    setRows(newObj);
  };

  // ADD NEW ROW
  const handleAddRow = async (e: any, parentId: number | null, idx: number) => {
    let newObj = {
      ...newRowObj,
      parentId: parentId,
      machineOperatorSalary: 0,
      mainCosts: 0,
      materials: 0,
      mimExploitation: 0,
      supportCosts: 0,
    }

    if (e.keyCode == 13) {
      try {
        const response = await axios.post(`http://185.244.172.108:8081/v1/outlay-rows/entity/${props.entity}/row/create`,
          newObj
        );
        setUpdateMode(idx, false);
        getInfo();
        setInd(false);
        setNewRowObj(initRow);
        return response.data;
      } catch (error) {
        console.error(error);
      }
    }
  };

  // UPDATE ROW
  const handleUpdRow = async (e: any, idx: number, id: number) => {
    if (e.keyCode == 13) {
      try {
        const res = await axios.post(`http://185.244.172.108:8081/v1/outlay-rows/entity/${props.entity}/row/${id}/update`, {
          equipmentCosts: rows[idx].equipmentCosts,
          estimatedProfit: rows[idx].estimatedProfit,
          machineOperatorSalary: 0,
          mainCosts: 0,
          materials: 0,
          mimExploitation: 0,
          overheads: rows[idx].overheads,
          rowName: rows[idx].rowName,
          salary: rows[idx].salary,
          supportCosts: 0
        });
        setUpdateMode(idx, false);
        getInfo();
        setInd(false);
        setNewRowObj(initRow);
        return res.data;
      } catch (error) {
        console.log(error)
      }
    }
  };

  // DELETE ROW
  const deleteRow = async (id: number | null, idx: number) => {
    if (!id) {
      let newArr = rows.filter((item, i) => idx === i ? "" : item)
      setRows(newArr);
      setUpdateMode(idx, false);
      setInd(false);
    } else {
      try {
        const res = await axios.delete(`http://185.244.172.108:8081/v1/outlay-rows/entity/${props.entity}/row/${id}/delete`);
        setUpdateMode(idx, false);
        getInfo();
        setInd(false);
        return res.data;
      } catch (error) {
        console.log(error)
      }
    }
  };

  // ADD BLANK ROW BEFORE ADD TO DATA
  const addNewRow = (row: any | null, idx: number) => {
    let newArr: any = [];
    if (!row && !ind) {
      newArr = [...rows, {
        childCount: 0,
        level: 0,
        rowName: "",
        salary: 0,
        equipmentCosts: 0,
        overheads: 0,
        estimatedProfit: 0,
        parentId: null,
      }]
      setRows(newArr);
      setUpdateMode(newArr.length, true);
    } else if (!ind && idx !== null) {
      let newArr1 = rows.slice(0, (idx + 1));
      let newArr2 = rows.slice(idx + 1);
      newArr = [...newArr1, {
        childCount: 0,
        level: row.level + 1,
        rowName: "",
        salary: 0,
        equipmentCosts: 0,
        overheads: 0,
        estimatedProfit: 0,
        parentId: row.id,
      }, ...newArr2]
      setRows(newArr);
      setUpdateMode(idx+1, false);
      setInd(true);
    }
    
  };

  useEffect(() => {
    getInfo();
  }, [])

  return (
    <div className='tableWrapper'>
      <div className='tableHeader'>
        <div className='tableHeaderTitle'>Строительно-монтажные работы</div>
      </div>
      <table>
        <thead>
          <tr className='tableHead'>
            <th
              className="levelColumn"
              onClick={() => addNewRow(null, rows.length - 1)}
            >
              Уровень
            </th>
            <th className="rowNameColumn">Наименование работ</th>
            <th>Основная з/п</th>
            <th>Оборудование</th>
            <th>Накладные расходы</th>
            <th>Сметная прибыль</th>
          </tr>
        </thead>
        <tbody>
          {rows?.map((row, idx) => (
            <tr key={idx} className='tableBodyRow' onDoubleClick={() => {setUpdateMode(idx, false); setInd(!ind)}}>
              <td
                className="levelColumn"
                style={{
                  display: "flex",
                  alignItems: "center",
                  paddingLeft: row.level === 0 ? '12px' : `calc(${20 / 1681 * 100 * row.level}% + 12px)`,
                  width: row.level === 0 ? 'calc(110 / 1681 * 100%)' : `calc((110 + 20 * ${row.level})/ 1681 * 100%)`
                }}
              >
                {/* {row.level !== 0 && <img src={line1} alt="" />} */}
                <img src={icon5} className="tableImg" onClick={() => addNewRow(row, row.childCount + idx)} />
                {updForm?.[idx] && <img className="tableImg1" src={icon6} onClick={() => deleteRow(row.id, idx)} />}
              </td>
              {!updForm?.[idx] &&
                <>
                  <td
                    className="rowNameColumn"
                    style={{
                      width: row.level === 0 ? 'calc(757 / 1681 * 100%)' : `calc((757 - 20 * ${row.level})/ 1681 * 100%)`
                    }}
                  >
                    {row.rowName}
                  </td>
                  <td>{row.salary.toLocaleString("ru-RU")}</td>
                  <td>{row.equipmentCosts.toLocaleString("ru-RU")}</td>
                  <td>{row.overheads.toLocaleString("ru-RU")}</td>
                  <td>{row.estimatedProfit.toLocaleString("ru-RU")}</td>
                </>
              }
              {/* FORM FOR ADD NEW ROW */}
              {updForm?.[idx] && !row.id &&
                <td className="updFormRow">
                  <form style={{ display: "flex" }}>
                    <input
                      type="text"
                      className="rowNameInput"
                      style={{
                        width: row.level === 0 ? 'calc((757 + 22) / 1681 * 100%)' : `calc((757 + 26 - (14) * ${row.level}) / 1681 * 100%)`
                      }}
                      value={newRowObj?.rowName || ""}
                      onChange={e => handleOnChange('rowName', e)}
                      onKeyDown={e => handleAddRow(e, row.parentId, idx)}
                    />
                    <input
                      type="number"
                      className="salaryInput"
                      value={newRowObj?.salary || ""}
                      onChange={e => handleOnChange('salary', e)}
                      onKeyDown={e => handleAddRow(e, row.parentId, idx)}
                    />
                    <input
                      type="number"
                      className="equipmentCostsInput"
                      value={newRowObj?.equipmentCosts || ""}
                      onChange={e => handleOnChange('equipmentCosts', e)}
                      onKeyDown={e => handleAddRow(e, row.parentId, idx)}
                    />
                    <input
                      type="number"
                      className="overheadsInput"
                      value={newRowObj?.overheads || ""}
                      onChange={e => handleOnChange('overheads', e)}
                      onKeyDown={e => handleAddRow(e, row.parentId, idx)}
                    />
                    <input
                      type="number"
                      className="estimatedProfitInput"
                      value={newRowObj?.estimatedProfit || ""}
                      onChange={e => handleOnChange('estimatedProfit', e)}
                      onKeyDown={e => handleAddRow(e, row.parentId, idx)}
                    />
                  </form>
                </td>
              }
              {/* FORM FOR UPDATE ROW */}
              {updForm?.[idx] && row.id &&
                <td className="updFormRow">
                  <form style={{ display: "flex" }}>
                    <input
                      type="text"
                      className="rowNameInput"
                      style={{
                        width: row.level === 0 ? 'calc((757 + 22) / 1681 * 100%)' : `calc((757 + 26 - (14) * ${row.level}) / 1681 * 100%)`
                      }}
                      value={row?.rowName}
                      onChange={e => handleOnChange1('rowName', e, idx)}
                      onKeyDown={e => handleUpdRow(e, idx, row.id)}
                    />
                    <input
                      type="number"
                      className="salaryInput"
                      value={row.salary}
                      onChange={e => handleOnChange1('salary', e, idx)}
                      onKeyDown={e => handleUpdRow(e, idx, row.id)}
                    />
                    <input
                      type="number"
                      className="equipmentCostsInput"
                      value={row.equipmentCosts}
                      onChange={e => handleOnChange1('equipmentCosts', e, idx)}
                      onKeyDown={e => handleUpdRow(e, idx, row.id)}
                    />
                    <input
                      type="number"
                      className="overheadsInput"
                      value={row.overheads}
                      onChange={e => handleOnChange1('overheads', e, idx)}
                      onKeyDown={e => handleUpdRow(e, idx, row.id)}
                    />
                    <input
                      type="number"
                      className="estimatedProfitInput"
                      value={row.estimatedProfit}
                      onChange={e => handleOnChange1('estimatedProfit', e, idx)}
                      onKeyDown={e => handleUpdRow(e, idx, row.id)}
                    />
                  </form>
                </td>
              }
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Table;