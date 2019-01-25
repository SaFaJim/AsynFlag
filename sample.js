//before  like this
function getStudentSchool(id) {
    ajax.get("/Test/GetStudent", { "studentId": id }, function (student) {
        if (student != null && student.ClassId != null) {
            ajax.get("/Test/GetClass", { "classId": student.ClassId }, function (studentClass) {
                if (studentClass != null && studentClass.SchoolId != null) {
                    ajax.get("/Test/GetSchool", { "schoolId": studentClass.SchoolId }, function (school) {
                        if (school != null) {
                            console.log(school);
                        }
                    });
                }
            });
        }
    });
}

window.onload= function(){
	getStudentSchool(1);
};


//after  you can this
function AsynFlag() {
    if (typeof this.setFlag != "function") {
        AsynFlag.prototype.setFlag = function (obj, name, fun) {
            if (obj.hasOwnProperty(name)) {
                obj[name + "_fun"] = fun;
                return;
            }
            obj[name] = 0;
            obj[name + "_"] = 0;
            Object.defineProperty(obj, name, {
                get: function () {
                    return obj[name + "_"];
                },
                set: function (value) {
                    if (value != obj[name + "_"]) {
                        obj[name + "_"] = value;
                    }
		     else
		     {
		     	return;
		     }
                    if (obj[name + "_fun"] == null) {
                        obj[name + "_fun"] = fun;
                    }
                    obj[name + "_fun"]();
                }
            });
        };
    }
}

var param = { "studentId": 0, "classId": 0, "schoolId": 0 };
var s = new AsynFlag();
var flag = {};

function getStudent()
{
    ajax.get("/Test/GetStudent", { "studentId": param.studentId }, function (student) {
        if (student != null && student.ClassId != null) {
	    param.ClassId = student.ClassId;
            s.setFlag(flag, "canGetClass", getClass);
            flag.canGetClass = true;
        } 
    });
}

function getClass()
{
    ajax.get("/Test/GetClass", { "classId": param.ClassId }, function (studentClass) {
        if (studentClass != null && studentClass.SchoolId != null) {
 	    param.schoolId = studentClass.SchoolId;
            s.setFlag(flag, "canGetSchool", getSchool);
            flag.canGetSchool = true;
        }
    });
}

function getSchool()
{
    ajax.get("/Test/GetSchool", { "schoolId": param.SchoolId }, function (school) {
        if (school != null) {
            console.log(school);
        }
    });
}

window.onload= function(){
    param.studentId =1;
    getStudent();
};

