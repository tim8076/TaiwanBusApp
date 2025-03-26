
import { useNavigate } from "react-router-dom"
export default function ModalFavorite({ favoriteModalRef, isFavorite, closeModal }) {
  const navigate = useNavigate();
  const checkFavorite = () => {
    closeModal();
    setTimeout(() => {
      navigate('/bus-favorites')
    }, 0);
  }
  return (
    <div className="modal fade show"
      ref={favoriteModalRef}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-body pt-13 pb-10">
            <div className="d-flex justify-content-center mb-6">
              <div className={`d-flex justify-content-center align-items-center rounded-circle ${isFavorite ? 'bg-primary-100' : 'bg-secondary'}`}
                style={{
                  width: '65px',
                  height: '65px',
                }}>
                <span className="material-symbols-rounded text-light display-4 fw-bold">
                  { isFavorite ? 'check' : 'close' }
                </span>
              </div>
            </div>
            <p className="text-center mb-8 fs-1 fw-bold">
              { isFavorite ? '已加入收藏' : '已移除收藏'}
            </p>
            <div className="d-flex justify-content-center">
              <button type="button" className="btn btn-outline-primary py-1 px-5 rounded-pill me-3"
                data-bs-dismiss="modal">
                關閉
              </button>
              <button type="button"
                className="btn btn-primary py-1 px-5 rounded-pill"
                onClick={(e) => checkFavorite(e)}>
                查看收藏
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
