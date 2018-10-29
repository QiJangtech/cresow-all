import React, { Component } from 'react';

//Component
import Box from '../../Components/Box/Box';
import BoxHeader from '../../Components/Box/BoxHeader';
import BoxBody from '../../Components/Box/BoxBody';

export default class WalletInfo extends Component {  
    constructor(props) {
        super(props);
        this.state= {
            copySuccess: '',
            data: {
              recentTransaction : this.props.recentTransaction,
            }
        };
    }

    copyToClipboard = (e) => {
        if (navigator.userAgent.match(/ipad|ipod|iphone/i)) {
            const el = this.walletInfo;
            const editable = el.contentEditable;
            const readOnly = el.readOnly;
            el.contentEditable = true;
            el.readOnly = false;
            const range = document.createRange();
            range.selectNodeContents(el);
            const sel = window.getSelection();
            sel.removeAllRanges();
            sel.addRange(range);
            el.setSelectionRange(0, 999999);
            el.contentEditable = editable;
            el.readOnly = readOnly;
        }else{
            this.walletInfo.select();
        }
        document.execCommand('copy');
        // This is just personal preference.
        // I prefer to not show the the whole text area selected.
        e.target.focus();
        this.setState({ copySuccess: 'Copied!' });
      };

    render() {
        return (
            <Box boxType="box">
                <BoxHeader title="Wallet Information" />
                <BoxBody>
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="input-group">
                                <input type="text" readOnly className="form-control"
                                    ref={(walletinfo) => this.walletInfo = walletinfo}
                                    value='1231212312xx'
                                /><span className="input-group-addon"><i onClick={this.copyToClipboard} className="fa fa-copy"></i> {this.state.copySuccess}</span>
                            </div>
                        </div>
                        <div className="col-sm-7">
                            <label>Your Balance</label>
                            <p>0.0000000<span>ETH</span></p>
                        </div>
                        <div className="col-sm-5">
                            <img className="img-responsive" alt="testing" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYXVTbxmHQuOogxDeNx7U6z7neHX4kOQPZEBLG5nzQZoMMhkFN"></img>
                        </div>
                    </div>
                </BoxBody>
            </Box>
        );
    }
}