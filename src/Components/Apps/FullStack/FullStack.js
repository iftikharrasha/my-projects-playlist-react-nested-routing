import React from 'react';
import {
    Link
} from "react-router-dom";
import igot from '../../../Image/igot.png';

const FullStack = () => {
    /*=============== SHOW MODAL ===============*/
    const showModal = (openButton, modalContent) => {
        const openBtn = document.getElementById(openButton);
        const modalContainer = document.getElementById(modalContent);
        
        if(openBtn && modalContainer){
            openBtn.addEventListener('click', ()=> {
                modalContainer.classList.add('show-modal');
            })
        }
    }
    showModal('open-modal','modal-container');

    /*=============== CLOSE MODAL ===============*/
    const closeBtn = document.querySelectorAll('.modal__close')

    function closeModal(){
        const modalContainer = document.getElementById('modal-container')
        modalContainer.classList.remove('show-modal')
    }
    closeBtn.forEach(close => close.addEventListener('click', closeModal))

    return (
        <>
            <div className="app__inside">
                <div className="app__single" id="open-modal">
                    <button className="reg--24">
                        <img src={igot} alt={igot}/>
                        <p className="lit--18">RH-London</p>
                    </button>
                </div>
            </div>

            <div className="modal__container" id="modal-container">
                <div className="modal__content">
                    <div className="modal__close" title="Close">
                        <i className='fa fa-close'></i>
                    </div>
                    <h2 className="modal__title">Good Job!</h2>
                    <button> View status</button>
                </div>
            </div>
        </>
    );
};

export default FullStack;