export default ({ onClose }) => (
  <div className='modal-bg' onClick={onClose}>
    <div className='modal-fg'>
      <h1>Add a timezone</h1>

      <div className='select-container'>
        <section className='search'>
          <input type='text' placeholder='search' />
        </section>

        <section className='timezones'>
          <div className='timezone'><span>Asia/Shanghai</span></div>
          <div className='timezone'><span>Asia/Shanghai</span></div>
          <div className='timezone'><span>Asia/Shanghai</span></div>
          <div className='timezone'><span>Asia/Shanghai</span></div>
          <div className='timezone'><span>Asia/Shanghai</span></div>
          <div className='timezone'><span>Asia/Shanghai</span></div>
          <div className='timezone'><span>Asia/Shanghai</span></div>
          <div className='timezone'><span>Asia/Shanghai</span></div>
          <div className='timezone'><span>Asia/Shanghai</span></div>
          <div className='timezone'><span>Asia/Shanghai</span></div>
          <div className='timezone'><span>Asia/Shanghai</span></div>
          <div className='timezone'><span>Asia/Shanghai</span></div>
          <div className='timezone'><span>Asia/Shanghai</span></div>
          <div className='timezone'><span>Asia/Shanghai</span></div>
          <div className='timezone'><span>Asia/Shanghai</span></div>
          <div className='timezone'><span>Asia/Shanghai</span></div>
          <div className='timezone'><span>Asia/Shanghai</span></div>
          <div className='timezone'><span>Asia/Shanghai</span></div>
          <div className='timezone'><span>Asia/Shanghai</span></div>
          <div className='timezone'><span>Asia/Shanghai</span></div>
          <div className='timezone'><span>Asia/Shanghai</span></div>
          <div className='timezone'><span>Asia/Shanghai</span></div>
          <div className='timezone'><span>Asia/Shanghai</span></div>
          <div className='timezone'><span>Asia/Shanghai</span></div>
          <div className='timezone'><span>Asia/Shanghai</span></div>
          <div className='timezone'><span>Asia/Shanghai</span></div>
          <div className='timezone'><span>Asia/Shanghai</span></div>
          <div className='timezone'><span>Asia/Shanghai</span></div>
          <div className='timezone'><span>Asia/Shanghai</span></div>
          <div className='timezone'><span>Asia/Shanghai</span></div>
          <div className='timezone'><span>Asia/Shanghai</span></div>
          <div className='timezone'><span>Asia/Shanghai</span></div>
        </section>
      </div>
    </div>

    <style jsx>{`
      .modal-bg {
        position: fixed;
        top: 0;
        right: 0;
        bottom 0;
        left: 0;
        z-index: 990;
        background: rgba(0,0,0,0.8);
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .modal-fg {
        display: flex;
        flex-direction: column;
        background: white;
        border-radius: 5px;
        box-shadow: 0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22);
        margin: 5px;
        padding: 10px 20px;
        height: 80vh;
        width: 800px;
        z-index: 999
      }
      .select-container {
        flex-grow: 1;
        display: flex;
        flex-direction: column;
      }
      .search {
        display: flex;
        height: 50px;
        margin-bottom: 10px;
      }
      .search > input {
        flex-grow: 1;
      }
      .timezones {
        flex-grow: 1;
        overflow-y: scroll;
      }
      .timezone {
        display: flex;
        align-items: center;
        height: 50px;
        padding: 5px 0;
        border-bottom: 1px solid lightgrey;
      }
    `}</style>
  </div>
)
