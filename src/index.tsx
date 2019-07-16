import * as React from "react";
import { render } from "react-dom";
import "./styles.css";

import "@blueprintjs/core/lib/css/blueprint.css";
import "@blueprintjs/icons/lib/css/blueprint-icons.css";
import "normalize.css";

import { RecursiveItem, IDataset } from "./RecursiveItem";

const dataset_test1:IDataset = { name: "item1", begin:10, end:1000, data:
  [
    { name: "item10", begin:10, end:20 },
    { name: "item20", begin:20, end:30 },
    { name: "item30", begin:30, end:40 },
    { name: "item40", begin:10, end:500, data:[
        { name: "item400", begin:60, end:80 },
        { name: "item410", begin:100, end:175, data:[
          { name: "item4100", begin:110, end:20 },
          { name: "item4110", begin:120, end:30 },
          { name: "item4120", begin:130, end:40 },
        ] }
      ]
    },
    { name: "item50", begin:60, end:100 },
    { name: "item60", begin:600, end:800 },
    { name: "item70", begin:400, end:600 },
    { name: "item80", begin:500, end:550 },
  ]
};

  // #################################################################
  interface IDatasetEx extends IDataset{
    data:IDatasetEx[];
    predicate_id?:number;
    id?:string;
    source?:string;
  }

  const dataset_test2:IDatasetEx = {
	begin:481,
	data:[
		{
			begin:481,
			data:[
				{predicate_id: 1, name:"Règne de Clovis Ier,  Roi des Francs", "begin":481, "end":511, "id":"1000", data:[
            {predicate_id: 2, name:"Début du règne de Clovis Ier,  Roi des Francs","begin":481, "id":"10010", data:[], source:""},
            {predicate_id: 3, name:"Fin du règne de Clovis Ier,  Roi des Francs","begin":511, "id":"10011", data:[], source:""},
          ],
          source:""
        },
				{name:"Règne de Clodomir, Roi d'Orléans","begin":511,"end":524, "id":"1001", data:[
					{predicate_id: 2, name:"Début du Règne de Clodomir, Roi d'Orléans","begin":511, "id":"10010", data:[], source:""},
					{predicate_id: 3, name:"Fin Règne de Clodomir, Roi d'Orléans","begin":524, "id":"10011", data:[], source:""},
				], source:""},
				{name:"Règne de Thierry Ier, Roi de Metz (futur Austrasie)","begin":511,"end":534, "id":"1002", data:[
					{predicate_id: 2, name:"Début du Règne de Thierry Ier","begin":511, "id":"10010", data:[], source:""},
					{predicate_id: 3, name:"Fin du Règne de Thierry Ier","begin":534, "id":"10010", data:[], source:""},
				], source:""},
				{name:"Règne de Childebert Ier, Roi de Paris", "begin":511,"end":558, "id":"1003", data:[
					{predicate_id: 2, name:"Début du Childebert Ier, Roi de Paris","begin":511, "id":"10010", data:[], source:""},
					{predicate_id: 3, name:"Fin du Childebert Ier, Roi de Paris","begin":558, "id":"10010", data:[], source:""},
				], source:""},
				{name:"Règne de Clotaire Ier, Roi de Neustrie","begin":511,"end":561, "id":"1004", data:[
					{predicate_id: 2, name:"Début de Clotaire Ier, Roi de Neustrie","begin":511, "id":"10010", data:[], source:""},
					{predicate_id: 3, name:"Fin de Clotaire Ier, Roi de Neustrie","begin":561, "id":"10010", data:[], source:""},
				], source:""},
				{name:"Règne de Clotaire Ier,Roi des Francs","begin":558,"end":561, "id":"1005", data:[
					{predicate_id: 2, name:"Début de Clotaire Ier, Roi des Francs","begin":558, "id":"10010", data:[], source:""},
					{predicate_id: 3, name:"Fin de Clotaire Ier, Roi des Francs","begin":561, "id":"10010", data:[], source:""},
				], source:""},
				{name:"Règne de Théodebert Ier, Roi d'Austrasie","begin":534,"end":548, "id":"1006", data:[
					{predicate_id: 2, name:"Début de Théodebert Ier, Roi d'Austrasie","begin":534, "id":"10010", data:[], source:""},
					{predicate_id: 3, name:"Fin de Théodebert Ier, Roi d'Austrasie","begin":548, "id":"10010", data:[], source:""},
				], source:""},
				{name:"Règne de Théodebald Ier, Roi d'Austrasie","begin":548,"end":555, "id":"1007", data:[
					{predicate_id: 2, name:"Début de Théodebald Ier, Roi d'Austrasie","begin":548, "id":"10010", data:[], source:""},
					{predicate_id: 3, name:"Fin de Théodebald Ier, Roi d'Austrasie","begin":555, "id":"10010", data:[], source:""},
				], source:""},
				{name:"Règne de Caribert Ier, Roi de Paris","begin":561,"end":567, "id":"1008", data:[
					{predicate_id: 2, name:"Début de Règne de Caribert Ier, Roi de Paris","begin":561, "id":"10010", data:[], source:""},
					{predicate_id: 3, name:"Fin de Règne de Caribert Ier, Roi de Paris","begin":567, "id":"10010", data:[], source:""},
				], source:""},
				{name:"Règne de Chilpéric Ier, Roi de Neustrie","begin":561,"end":584, "id":"1009", data:[
					{predicate_id: 2, name:"Début de Règne de Chilpéric Ier, Roi de Neustrie","begin":561, "id":"10010", data:[], source:""},
					{predicate_id: 3, name:"Fin de Règne de Chilpéric Ier, Roi de Neustrie","begin":584, "id":"10010", data:[], source:""},
				], source:""},
				{name:"Règne de Chilpéric Ier, Roi de Paris", "begin":567,"end":584, "id":"1010", data:[
					{predicate_id: 2, name:"Début de Règne de Chilpéric Ier, Roi de Paris","begin":567, "id":"10010", data:[], source:""},
					{predicate_id: 3, name:"Fin de Règne de Chilpéric Ier, Roi de Paris","begin":584, "id":"10010", data:[], source:""},

				], source:""},
				{name:"Règne de Gontran Ier, Roi de Bourgogne","begin":561,"end":592, "id":"1011", data:[

				], source:""},
				{name:"Règne de Gontran Ier, Roi de Paris","begin":584,"end":592, "id":"1012", data:[

				], source:""},
				
				{name:"Règne de Sigebert Ier, Roi d'Austrasie","begin":561,"end":575, "id":"1013", data:[], source:""},	
				{name:"Règne de Childebert II, Roi d'Austrasie","begin":575,"end":595, "id":"1014", data:[], source:""},
				{name:"Règne de Childebert II, Roi de Paris et de Bourgogne","begin":592,"end":595, "id":"1015", data:[], source:""},
				{name:"Règne de Thierry II, Roi de Bourgogne","begin":595,"end":613, "id":"1016", data:[], source:""},
				{name:"Règne de Thierry II,Roi d'Austrasie","begin":612,"end":613, "id":"1017", data:[], source:""},
				{name:"Règne de Sigebert II sous la régence de Brunehaut, Roi de Bourgogne & Roi d'Austrasie","begin":613,"end":613, "id":"1018", data:[], source:""},
				{name:"Règne de Clotaire II,Roi de Neustrie","begin":584,"end":629, "id":"1019", data:[], source:""},
				{name:"Règne de Clotaire II,Roi de Paris","begin":595,"end":629, "id":"1020", data:[], source:""},
				{name:"Règne de Clotaire II,Roi des Francs","begin":613,"end":629, "id":"1021", data:[], source:""},
				{name:"Règne de Dagobert Ier, 	Roi des Francs (sans l'Aquitaine)","begin":629,"end":639, "id":"1022", data:[], source:""},
				{name:"Règne de Dagobert Ier, Roi des Francs","begin":632,"end":639, "id":"1023", data:[], source:""},
				{name:"Règne de Caribert, Roi d'Aquitaine","begin":629,"end":632, "id":"1024", data:[], source:""},
				{name:"Règne de Clovis II, Roi de Neustrie, de Bourgogne","begin":639,"end":657, "id":"1025", data:[], source:""},
				{name:"Règne de Clovis II, Roi d'Austrasie","begin":656,"end":657, "id":"1026", data:[], source:""},
				{name:"Règne de Sigebert III, Roi d'Austrasie","begin":639,"end":656, "id":"1027", data:[], source:""},
				{name:"Règne de Childebert III, Roi d'Austrasie","begin":656,"end":662, "id":"1028", data:[], source:""},
				{name:"Règne de Clotaire III, Roi de Neustrie, de Bourgogne","begin":657,"end":673, "id":"1029", data:[], source:""},
				{name:"Règne de Childéric II, Roi d'Austrasie","begin":662,"end":675, "id":"1030", data:[], source:""},
				{name:"Règne de Childéric II, Occupe la Neustrie","begin":673,"end":675, "id":"1031", data:[], source:""},
				{name:"Règne de Thierry III, Roi de Neustrie","begin":673,"end":691, "id":"1032", data:[], source:""},
				{name:"Règne de Thierry III, Roi des Francs (en fait uniquement de Neustrie). L'Austrasie étant aux mains de Pépin de Herstal","begin":679,"end":691 , "id":"1033", data:[], source:""},
				{name:"Règne de Clovis III, Roi trés provisoire de Neustrie, Bourgogne et Austrasie","begin":675,"end":675, "id":"1034", data:[], source:""},
				{name:"Règne de Dagobert II, Roi d'Austrasie","begin":676,"end":679, "id":"1035", data:[], source:""},
				{name:"Règne de Clovis IV, Roi des Francs (en fait uniquement de Neustrie)","begin":691,"end":695, "id":"1036", data:[], source:""},
				{name:"Règne de Childebert IV, Roi des Francs (en fait uniquement de Neustrie)","begin":695,"end":711, "id":"1037", data:[], source:""},
				{name:"Règne de Dagobert III, Roi des Francs (en fait uniquement de Neustrie)","begin":711,"end":715, "id":"1038", data:[], source:""},
				{name:"Règne de Chilpéric II, Roi des Francs (en fait uniquement de Neustrie)","begin":715,"end":721, "id":"1039", data:[], source:""},
				{name:"Règne de Chilpéric II, Roi des Francs","begin":719,"end":721, "id":"1040", data:[], source:""},
				{name:"Règne de Clotaire IV, Roi d'Austrasie","begin":717,"end":719, "id":"1041", data:[], source:""},	
				{name:"Règne de Thierry IV, Roi des Francs","begin":721,"end":737, "id":"1042", data:[], source:""},
				{name:"Règne de Charles Martel, Maire du Palais (pas de roi durant cette période). Il gouverne dans les faits depuis 717 l'Austrasie et depuis 721 toute la France.","begin":737,"end":741, "id":"1043", data:[], source:""},
				{name:"Règne de Childéric III, Roi des Francs","begin":743,"end":751, "id":"1044", data:[], source:""}
			],
			end:751,
//			id: "mero.00002",
			name:'Généalogie des Mérovingiens',
//			source:"https://fr.geneawiki.com/index.php/Liste_des_rois_de_France"
		}
	],
	end:2019,
	id: "france.00002",
	name:'Histoire de la France',
	source:""
};

  // #################################################################

function App() {
  // Customise RecursiveItem rendering
  RecursiveItem.columnWidth = 150;
  RecursiveItem.DefaultWidth = 75;
  // Render dataset
  return (
    <div className="App">
      <RecursiveItem key={-1} data={dataset_test1} scale={1} />
      <RecursiveItem key={-1} data={dataset_test2} scale={1} offset_x={600}/>
    </div>
  );
}

  // #################################################################

const rootElement = document.getElementById("root");
render(<App />, rootElement);
