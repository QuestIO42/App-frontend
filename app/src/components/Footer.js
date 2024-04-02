import 'bootstrap/dist/css/bootstrap.min.css';
import React, {useState} from 'react';

const Footer= () => {
    return (
      <div>
        <footer class="d-flex flex-wrap justify-content-between align-items-center py-3 QuestFoot border-top">
          <ul class="col-md-4 mb-0 contato-cont list-unstyled">
            <li class="col-md-4 mb-0 contato">Contato</li>
            <li class="col-md-4 mb-0 contato-email">
              contato@questi0.com.br
            </li>
          </ul>
          
          <div class="col-md-4 d-flex flex-column align-items-center justify-content-center  text-decoration-none">
          <a href="/" class="col-md-4 d-flex align-items-center justify-content-center  text-decoration-none">
            <p class="col-md-0 mb-0 contato-quem"> Quem Somos</p>
          </a>
            <a class="text-decoration-none" href="#"><p class=" col-md-0 mb-0 data-nome">- 2024 | questI0.dc.ufcar.br -</p> </a>
            <p class=" col-md-0 mb-0 data-nome">by questI0 lab</p>
          </div>
          
    

    <ul class="nav col-md-4 justify-content-end">
      <li class="nav-item minha-conta"><a href="#" class="px-2 text-decoration-none contato ">Minha conta</a></li>
    </ul>
  </footer>
</div>
    );
}
export default Footer;