export const OPEN_MODAL = "OPEN_MODAL";
export const CLOSE_MODAL = "CLOSE_MODAL";
export const OPEN_NAV_MODAL = "OPEN_NAV_MODAL";
export const CLOSE_NAV_MODAL = "CLOSE_NAV_MODAL";

export const openModal = (modal, modalNotebookId) => ({
  type: OPEN_MODAL,
  modal,
  navModalId: modalNotebookId
});

export const closeModal = () => ({
  type: CLOSE_MODAL
});

export const openNavModal = (navModal, navModalId) => ({
  type: OPEN_NAV_MODAL,
  navModal,
  navModalId
});

export const closeNavModal = () => ({
  type: CLOSE_NAV_MODAL
});
