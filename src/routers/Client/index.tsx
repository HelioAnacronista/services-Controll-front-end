import './style.scss';

import { useContext, useEffect, useState } from 'react';
import * as React from 'react';
import { BsFillArrowRightSquareFill } from 'react-icons/bs';

import ButtonLayout from '../../components/ButtonLayout';
import { ClientDTO } from '../../models/client';
import * as clientServices from '../../services/client-services';
import { ContextSearch } from '../../utils/context-search';
import TableRowClient from './TableRowClient';

type PropsParent = {
   params : string
}

function Client({params}: PropsParent) {

   const {contextSearch} = useContext(ContextSearch);

   const [clientList, setClientList] = useState<ClientDTO[]>([]);

   const [isListPage, setisListPage] = useState(false);

   const [queryParams, setQueryParams] = useState<QueryParams>({
      page: 0,
      name: ""
   });

   function findName(name: String): ClientDTO[] {
      return clientList.filter((x) => x.name === name );
   }

   
   
   


   //Fazer a requisição com os params passados
   useEffect(() => {
      clientServices.findPageRequest(queryParams.page, queryParams.name).then(response => {
         const nextPage = response.data.content;
         setClientList(clientList.concat(nextPage));
         setisListPage(response.data.last)
      })
   }, [queryParams]);

   //Pesquisa  
   function handleSearch(searchText: string) {
      setClientList([]);
      setQueryParams({ ...queryParams, page: 0, name: searchText })
   }

   
   //Proxima pagina
   function handleNextPageClick() {
      setQueryParams({ ...queryParams, page: queryParams.page + 1 })
   }

   return (
      <>
      <main>
         <div className="">
            <div className="header-list-work">
               <div className="container-work">
               
               </div>
            </div>
            <div style={{ display: 'flex' }} className="container-work" >
               <table className="table-work table-striped">
                  <thead>
                     <tr>
                        <th>id</th>
                        <th>Serviço</th>
                        <th>Valor</th>
                        <th>Status</th>
                        <th>Editar</th>
                        <th>Deletar</th>
                     </tr>
                  </thead>

                  <tbody>
                     {  (params) ?
                        clientList.filter(x => x.name === params).map(x => <TableRowClient key={x.id} client={x}></TableRowClient>) 
                        :
                        clientList.map(obj => <TableRowClient key={obj.id} client={obj}></TableRowClient>)
                     }
                  </tbody>

                  <div className="table-bottom" onClick={handleNextPageClick}>
                     <ButtonLayout name="PROXIMA" img={<BsFillArrowRightSquareFill />}  ></ButtonLayout>
                  </div>

               </table>
               <div className="container-right">
                  <ButtonLayout name="CRIAR" ></ButtonLayout>
               </div>
            </div>
         </div>
      </main>
      </>
   );
};

export default Client;