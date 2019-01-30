export const OPEN_MODAL = 'OPEN_MODAL';
export const CLOSE_MODAL = 'CLOSE_MODAL';
export const OPEN_NAV_MODAL = 'OPEN_NAV_MODAL';
export const CLOSE_NAV_MODAL = 'CLOSE_NAV_MODAL';

export const openModal = (modal, modalNotebookId) => {
  return {
    type: OPEN_MODAL,
    modal,
    navModalId: modalNotebookId
  };
};

export const closeModal = () => {
  return {
    type: CLOSE_MODAL
  };
};

export const openNavModal = (navModal, navModalId) => {
  return {
    type: OPEN_NAV_MODAL,
    navModal,
    navModalId
  };
};

export const closeNavModal = () => {
  return {
    type: CLOSE_NAV_MODAL
  };
};