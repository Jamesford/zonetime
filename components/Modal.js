export default ({ onClose, timezones }) => (
  <div className='modal-wrapper'>
    <div className='modal-bg' onClick={onClose} />

    <div className='modal-fg'>
      <header className='modal-fg-header'>
        <h1>Timezones</h1>
        <button className='close' onClick={onClose}>&times;</button>
      </header>

      <div className='select-container'>
        <section className='search'>
          <input type='text' placeholder='Filter timezones...' />
        </section>

        <section className='timezones'>
          {timezones.map(timezone => (
            <div className='timezone' key={timezone.value}>
              <span>{timezone.label}</span>
            </div>
          ))}
        </section>
      </div>
    </div>

    <style jsx>{`
      .modal-wrapper,
      .modal-bg {
        position: fixed;
        top: 0;
        right: 0;
        bottom 0;
        left: 0;
        z-index: 990;
      }
      .modal-wrapper {
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .modal-bg {
        background: rgba(0,0,0,0.4);
      }
      .modal-fg {
        display: flex;
        flex-direction: column;
        background: white;
        border-radius: 5px;
        box-shadow: 0 2px 6px 0 hsla(0, 0%, 0%, 0.2);
        margin: 15px;
        padding: 10px 20px;
        height: 80vh;
        width: 400px;
        z-index: 999;
        font-weight: 300;
      }
      .modal-fg-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-shrink: 0;
      }
      h1 {
        font-weight: 300;
      }
      .close {
        cursor: pointer;
        border-radius: 50%;
        background: hsl(220, 12%, 95%);
        width: 25px;
        height: 25px;
        border: none;
      }
      .close:hover {
        box-shadow: 0 2px 3px 0 hsla(0, 0%, 0%, 0.2);
      }
      .select-container {
        flex-grow: 1;
        display: flex;
        flex-direction: column;
      }
      .search {
        display: flex;
        margin-bottom: 10px;
        flex-shrink: 0;
        height: 50px;
      }
      .search > input {
        flex-grow: 1;
        background: hsl(220, 12%, 95%);
        border: none;
        border-radius: 5px;
        font-size: 16px;
        padding: 0 20px;
        box-shadow: inset 0 2px 4px 0 rgba(0,0,0,0.08);
        border: 1px solid white;
      }
      .search > input:focus {
        outline: none;
        border-color: dodgerblue;
      }
      .timezones {
        flex-grow: 1;
        overflow-y: scroll;
        background:
          linear-gradient(white 30%, rgba(255, 255, 255, 0)) 100% 0,
          linear-gradient(rgba(255, 255, 255, 0), white 70%) 0 100%,
          radial-gradient(farthest-side at 50% 0%, rgba(0, 0, 0, .3), rgba(0, 0, 0, 0)) 100% 0,
          radial-gradient(farthest-side at 50% 100%, rgba(0, 0, 0, .3), rgba(0, 0, 0, 0)) 0 100%,
          white;
        background-repeat: no-repeat;
        background-size: 100% 12px, 100% 12px, 100% 3px, 100% 3px;
        background-attachment: local, local, scroll, scroll;
      }
      .timezone {
        cursor: pointer;
        display: flex;
        align-items: center;
        height: 50px;
        border-radius: 5px;
        padding: 5px 10px;
      }
      .timezone:hover {
        background: rgb(236, 245, 251);
        color: rgb(44, 107, 180);
      }
    `}</style>
  </div>
)
