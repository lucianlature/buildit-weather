import React, {Component} from 'react'
import { connect } from 'react-redux'
import { debounce } from 'throttle-debounce'
import { bindActionCreators } from 'redux'
import { changeLocation } from '../store'

export class Search extends Component {
    changeCity = (event) => debounce(1000, this.props.changeLocation(event))

    render() {
        const { city } = this.props

        return (
            <section className='search'>
                <form method="get" id="search">
                    <input 
                        name="q" 
                        type="text" 
                        size="40" 
                        placeholder="Enter city name..." 
                        defaultValue={`${city.name},${city.country}`}
                        onChange={this.changeCity} 
                    />
                </form>
                <style jsx>{`
                .search form {
                    width: 300px;
                    margin: 10px;
                    float: right;
                }
                .search input {
                    background: rgba(252, 252, 252, .5);
                    border: 1px solid #3CCDFE;
                    color: #bebebe;
                    padding: 6px 15px 6px 35px;
                    -webkit-border-radius: 20px;
                    -moz-border-radius: 20px;
                    border-radius: 20px;
                    text-shadow: 0 2px 3px rgba(0, 0, 0, 0.1);
                    -webkit-box-shadow: 0 1px 3px rgba(0, 0, 0, 0.15) inset;
                    -moz-box-shadow: 0 1px 3px rgba(0, 0, 0, 0.15) inset;
                    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.15) inset;
                    -webkit-transition: all 0.7s ease 0s;
                    -moz-transition: all 0.7s ease 0s;
                    -o-transition: all 0.7s ease 0s;
                    transition: all 0.7s ease 0s;
                }

                .ie .search input {
                    line-height: 40px;
                }
                `}
                </style>
            </section>
        )
    }
}

const mapStateToProps = ({ city }) => ({ city })

const mapDispatchToProps = (dispatch) => {
  return {
    changeLocation: bindActionCreators(changeLocation, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Search)
