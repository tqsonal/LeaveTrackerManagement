import React, { Component } from 'react'

export class LeaveApplication extends Component {
    constructor(props) {
        super(props)

        this.state = {
            currentUserDetails: {},
            from: '',
            to: '',
            leaveApplication: [],
            cur_date: '',
            unique_id: '',
            index: '',
            disabled: true
        }
    }
    componentWillMount() {
        const { params } = this.props.match;
        const userId = params.id;
        console.log(userId)
        const details = JSON.parse(localStorage.getItem('UsersData'))
        details.map(user => {
            if (userId == user.Email) {
                this.setState({
                    currentUserDetails: user
                })
            }
        })
        var leave_application_current_user = JSON.parse(localStorage.getItem('leaveApplication'))
        var arr = []
        if (leave_application_current_user == null) {
            leave_application_current_user = []
        }
        else {
            leave_application_current_user.map(application => {
                if (userId == application.userId) {
                    arr.push(application)
                }
            })
        }
        this.setState({
            leaveApplication: arr
        })

    }   

    submitData = () => {
        const from_date = this.state.from
        const to_date = this.state.to
        const status = 'pending'
        const userid = this.state.currentUserDetails.Email
        const val = Math.floor(1000 + Math.random() * 9000)
        const FirstName = this.state.currentUserDetails.FirstName

        var LeaveApplications = JSON.parse(localStorage.getItem('leaveApplication'))
        if (LeaveApplications == null) {
            LeaveApplications = []
        }
        var current_user_Application = {
            App_id: val,
            name: FirstName,
            userId: userid,
            from: from_date,
            to: to_date,
            status: status
        }
        LeaveApplications.push(current_user_Application)
        localStorage.setItem('leaveApplication', JSON.stringify(LeaveApplications))
        var arr = JSON.parse(localStorage.getItem('leaveApplication'))
        var new_Arr = []
        arr.map(a => {
            if (a.userId == this.state.currentUserDetails.Email) {
                new_Arr.push(a)
            }
        })
        this.setState({
            leaveApplication: new_Arr,
            from: '',
            to: ''
        })
    }
    DeleteApplication = (e) => {
        var LeaveApplications = JSON.parse(localStorage.getItem('leaveApplication'))
        const deleteData = e.target.value

        for (var i = 0; i < LeaveApplications.length; i++) {
            var user = LeaveApplications[i]
            if (user.App_id == deleteData) {
                LeaveApplications.splice(i, 1)
            }
        }
        localStorage.setItem('leaveApplication', JSON.stringify(LeaveApplications))
        var arr = JSON.parse(localStorage.getItem('leaveApplication'))

        var new_Arr = []
        arr.map((a) => {
            if (a.userId == this.state.currentUserDetails.Email) {
                new_Arr.push(a)
            }
        })
        this.setState({
            leaveApplication: new_Arr
        })
    }
    date_validation = () => {
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0')
        var mm = String(today.getMonth() + 1).padStart(2, '0')
        var yyyy = today.getFullYear();
        today = yyyy + '-' + mm + '-' + dd;
        this.setState({
            cur_date: today
        })
    }

    EditApplication = (e) => {
        const editData = e.target.value
        this.setState({
            unique_id: editData,
            disabled: !this.state.disabled

        })
        let arr = JSON.parse(localStorage.getItem('leaveApplication'))
        for (var i = 0; i <= arr.length; i++) {
            if (arr[i].App_id == editData) {
                this.setState({
                    from: arr[i].from,
                    to: arr[i].to,
                    index: i
                })
                break;
            }
        }
    }
    renderingViewApplication = () => {
        return this.state.leaveApplication.map((application, index) => {
            const { App_id, userId, from, to, status } = application
            if(status=='Rejected'|| status=='Approved'){
                var disabled=true
            }
            return (
                <tr key={index}>
                    <td> {index + 1}</td>
                    <td> {from}</td>
                    <td> {to}</td>
                    <td> {status}</td>
                    <td><button className='btn btn-success'disabled={disabled} value={App_id} onClick={this.EditApplication}> Edit</button></td>
                    <td><button className='btn btn-danger' disabled={disabled} value={App_id} onClick={this.DeleteApplication}> Delete</button></td>

                </tr>
            )

        })
    }


    onchange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    updateData = e => {
        var arr = JSON.parse(localStorage.getItem('leaveApplication'))

        for (let i = 0; i < arr.length; i++) {
            if (arr[i].App_id == this.state.unique_id) {
                arr[i].from = this.state.from
                arr[i].to = this.state.to
                break;
            }
        }

        var new_Arr = []
        arr.map(a => {
            if (a.userId == this.state.currentUserDetails.Email) {
                new_Arr.push(a)
            }
        })
        this.setState({
            leaveApplication: new_Arr,
            from: '',
            to: ''
        })
    }

    componentDidMount() {

        this.date_validation()
    }

    logOut=()=>{
this.props.history.push('/login')
    }
    render() {
        return (
            <div className='container'>
                <h2 > welcome {this.state.currentUserDetails.FirstName}</h2>

                <button type='button' onClick={this.logOut} className='btn btn-primary right'> Sign Out</button>


                <label className='left'><h4> From</h4> </label>
                <input type="date" name="from" value={this.state.from} onChange={this.onchange} min={this.state.cur_date} />
                <label className='left'><h4> to</h4> </label>
                <input type="date" name="to" value={this.state.to} onChange={this.onchange} min={this.state.from} />

                <button className='btn btn-primary' onClick={this.submitData} disabled={!this.state.disabled}> apply</button> &nbsp;&nbsp;&nbsp;
                <button className='btn btn-primary' onClick={this.updateData} disabled={this.state.disabled}> update</button>


                <center>
                    <table className='table table-hover striped m-5' border='1'>
                        <tr>
                            <th scope='col'>Sr.No </th>
                            <th scope='col'>From </th>
                            <th scope='col'>to </th>
                            <th scope='col'>Status</th>
                            <th scope='col'>Edit </th>
                            <th scope='col'>Delete </th>

                        </tr>
                        {this.renderingViewApplication()}


                    </table>
                </center>
            </div>
        )
    }
}

export default LeaveApplication
