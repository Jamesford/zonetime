import React, { Component, PureComponent } from 'react'

class Timezone extends PureComponent {
  add = () => {
    const { value, onAdd, onClose } = this.props
    onAdd(value)
    onClose()
  }

  render() {
    const { label, value } = this.props
    return (
      <div className="timezone" key={value} onClick={this.add}>
        <span>{label}</span>

        <style jsx>{`
          .timezone {
            cursor: pointer;
            display: flex;
            justify-content: space-between;
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
  }
}

export default class Modal extends Component {
  constructor(props) {
    super(props)

    this.state = {
      search: ''
    }
  }

  onSearch = e => {
    this.setState({ search: e.target.value })
  }

  render() {
    const { timezones, selected, onAdd, onClose } = this.props
    const { search } = this.state

    const filteredTimezones = timezones.filter(
      ({ label, value }) =>
        !selected.includes(value) &&
        (label.toLowerCase().includes(search.toLowerCase()) ||
          value.toLowerCase().includes(search.toLowerCase()))
    )

    return (
      <div className="modal-wrapper">
        <div className="modal-bg" onClick={onClose} />

        <div className="modal-fg">
          <header className="modal-fg-header">
            <h1>Add Timezone</h1>

            <button className="close" onClick={onClose}>
              &times;
            </button>
          </header>

          <div className="select-container">
            <section className="search">
              <input
                type="text"
                placeholder="Filter timezones..."
                value={search}
                onChange={this.onSearch}
                autoFocus
              />
            </section>

            <section className="timezones">
              <div className="scrollable">
                {filteredTimezones.map(({ label, value }) => (
                  <Timezone
                    key={value}
                    label={label}
                    value={value}
                    onAdd={onAdd}
                    onClose={onClose}
                  />
                ))}
              </div>
              <div className="shadow shadow-top" />
              <div className="shadow shadow-bottom" />
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
          border: none;
          font-size: 1.5em;
          background: none;
        }
        .close:hover {
          color: red;
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
          position: relative;
        }
        .scrollable {
          position: absolute;
          top: 0;
          left: 0;
          bottom: 0;
          right: 0;
          overflow-y: scroll;
        }
        .shadow {
          position: absolute;
          pointer-events: none;
          left: 0;
          right: 0;
          height: 15px;
          background-image: linear-gradient(rgba(255,255,255, 1), rgba(255,255,255, 0));
        }
        .shadow-top {
          top: 0;
        }
        .shadow-bottom {
          bottom: 0;
          transform: rotate(180deg);
        }
      `}</style>
      </div>
    )
  }
}
