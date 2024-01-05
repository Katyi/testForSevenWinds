import icon3 from '../assets/icon3.svg';
import icon4 from '../assets/icon4.svg';

const SideBar = () => {
  return (
    <div className='sideBar'>
      <div className='SideBarHeader'>
        <div className="SideBarHeaderColumn1">
          <div className='SideBarHeaderTitle1'>Название проекта</div>
          <div className='SideBarHeaderTitle2'>Аббревиатура</div>
        </div>
        <div className="SideBarHeaderColumn2">
          <img src={icon4} className='sideBarImg1' />
        </div>
      </div>
      <div className='sideBarRow'>
        <img src={icon3} className='sideBarImg' />
        <div className='sideBarTitle'>По проекту</div>
      </div>
      <div className='sideBarRow'>
        <img src={icon3} className='sideBarImg' />
        <div className='sideBarTitle'>Объекты</div>
      </div>
      <div className='sideBarRow'>
        <img src={icon3} className='sideBarImg' />
        <div className='sideBarTitle'>РД</div>
      </div>
      <div className='sideBarRow'>
        <img src={icon3} className='sideBarImg' />
        <div className='sideBarTitle'>МТО</div>
      </div>
      <div className='sideBarRow'>
        <img src={icon3} className='sideBarImg' />
        <div className='sideBarTitle'>СМР</div>
      </div>
      <div className='sideBarRow'>
        <img src={icon3} className='sideBarImg' />
        <div className='sideBarTitle'>График</div>
      </div>
      <div className='sideBarRow'>
        <img src={icon3} className='sideBarImg' />
        <div className='sideBarTitle'>МиМ</div>
      </div>
      <div className='sideBarRow'>
        <img src={icon3} className='sideBarImg' />
        <div className='sideBarTitle'>Рабочие</div>
      </div>
      <div className='sideBarRow'>
        <img src={icon3} className='sideBarImg' />
        <div className='sideBarTitle'>Капвложения</div>
      </div>
      <div className='sideBarRow'>
        <img src={icon3} className='sideBarImg' />
        <div className='sideBarTitle'>Бюджет</div>
      </div>
      <div className='sideBarRow'>
        <img src={icon3} className='sideBarImg' />
        <div className='sideBarTitle'>Финансирование</div>
      </div>
      <div className='sideBarRow'>
        <img src={icon3} className='sideBarImg' />
        <div className='sideBarTitle'>Панорамы</div>
      </div>
      <div className='sideBarRow'>
        <img src={icon3} className='sideBarImg' />
        <div className='sideBarTitle'>Камеры</div>
      </div>
      <div className='sideBarRow'>
        <img src={icon3} className='sideBarImg' />
        <div className='sideBarTitle'>Поручения</div>
      </div>
      <div className='sideBarRow'>
        <img src={icon3} className='sideBarImg' />
        <div className='sideBarTitle'>Контрагенты</div>
      </div>
    </div>
  )
}

export default SideBar;


// const getAllChilds = (arr: [Rows]) => {
  //   return arr.flatMap(function traverse(el: any) {
  //     return [{
  //       id: el.id,
  //       rowName: el.rowName,
  //       total: el.total,
  //       salary: el.salary,
  //       mimExploitation: el.mimExploitation,
  //       machineOperatorSalary: el.machineOperatorSalary,
  //       materials: el.materials,
  //       mainCosts: el.mainCosts,
  //       supportCosts: el.supportCosts,
  //       equipmentCosts: el.equipmentCosts,
  //       overheads: el.overheads,
  //       estimatedProfit: el.estimatedProfit,
  //       child: el.child,
  //     }].concat(el.child?.flatMap(traverse) || [])
  //   })
  // };

  // const getAllChilds1 = (data:[any]) => {
  //   let result:any = [];
  //   let count:number = 0;

  //   data.forEach(el => {
      
  //     result.push({
  //       id: el.id,
  //       level: count,
  //       rowName: el.rowName,
  //       total: el.total,
  //       salary: el.salary,
  //       mimExploitation: el.mimExploitation,
  //       machineOperatorSalary: el.machineOperatorSalary,
  //       materials: el.materials,
  //       mainCosts: el.mainCosts,
  //       supportCosts: el.supportCosts,
  //       equipmentCosts: el.equipmentCosts,
  //       overheads: el.overheads,
  //       estimatedProfit: el.estimatedProfit,
  //       // child: el.child,
  //     });
  //     if (el.child) {
  //       count = count + 1;
  //       result.push(...getAllChilds1(el.child));
        
  //     }
  //   });
  //   return result;
  // }