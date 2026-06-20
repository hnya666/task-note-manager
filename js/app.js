var app=angular.module("taskApp",["ngRoute"]);
app.service("NoteService",
function()
{
    this.notes=
    JSON.parse(
        localStorage.getItem("notes")
    ) || [];
});

app.service("TaskService",
function()
{
    this.tasks=
    JSON.parse(
        localStorage.getItem("tasks")
    ) || [];
});


app.config(function($routeProvider)
{
    $routeProvider

    .when("/home",{
        templateUrl:"views/home.html"
    })
    .when("/notes",{
        templateUrl:"views/notes.html"
    })
    .when("/tasks",{
        templateUrl:"views/tasks.html"
    })
    .when("/search",{
        templateUrl:"views/search.html"
    })
    .otherwise({
        redirectTo:"/home"
    });
    
});

app.controller("HomeCtrl",
function($scope,NoteService,TaskService)
{
    $scope.notes=NoteService.notes;
    $scope.tasks=TaskService.tasks;

    $scope.getTotalNotes=function()
    {
        return $scope.notes.length;
    };

    $scope.getTotalTasks=function()
    {
        return $scope.tasks.length;
    };

    $scope.getCompletedTasks=function()
    {
        var count=0;

        angular.forEach($scope.tasks,function(task)
        {
            if(task.completed)
            {
                count++;
            }
        });

        return count;
    };

    $scope.getPendingTasks=function()
    {
        return $scope.tasks.length -
               $scope.getCompletedTasks();
    };

});

app.controller("NotesCtrl",
function($scope,NoteService)
{
    $scope.notes=NoteService.notes;

    $scope.addNote=function()
{
    // Validate that title is not empty
    if(!$scope.noteTitle || $scope.noteTitle.trim() === "")
    {
        alert("Please enter a note title");
        return;
    }

    // Create a fresh object to avoid reference issues
    var newNote = {
        title: $scope.noteTitle.trim(),
        content: $scope.noteContent || "",
        tag: $scope.noteTag || "",
        pinned: false
    };

    $scope.notes.push(newNote);

    localStorage.setItem(
        "notes",
        JSON.stringify($scope.notes)
    );

    // Clear input fields after successful add
    $scope.noteTitle="";
    $scope.noteContent="";
    $scope.noteTag="";
};


   $scope.deleteNote=function(index)
{
    $scope.notes.splice(index,1);

    localStorage.setItem(
        "notes",
        JSON.stringify($scope.notes)
    );
};

    $scope.saveNote=function(note)
{
    note.title=note.editTitle;
    note.content=note.editContent;
    note.tag=note.editTag;

    note.isEditing=false;

    localStorage.setItem(
        "notes",
        JSON.stringify($scope.notes)
    );
};

    $scope.startEditNote=function(note)
{
    note.isEditing=true;
    note.editTitle=note.title;
    note.editContent=note.content;
    note.editTag=note.tag;
};

$scope.togglePinNote=function(note)
{
    var index=$scope.notes.indexOf(note);

    if(note.pinned)
    {
        note.pinned=false;
    }
    else
    {
        note.pinned=true;

        $scope.notes.splice(index,1);
        $scope.notes.unshift(note);
    }

    localStorage.setItem(
        "notes",
        JSON.stringify($scope.notes)
    );
};
});

app.controller("TasksCtrl",
function($scope,TaskService)
{
    $scope.tasks=TaskService.tasks;

    $scope.addTask=function()
{
    // Validate that title is not empty
    if(!$scope.taskTitle || $scope.taskTitle.trim() === "")
    {
        alert("Please enter a task title");
        return;
    }

    // Create a fresh object to avoid reference issues
    var newTask = {
        title: $scope.taskTitle.trim(),
        priority: $scope.taskPriority || "",
        tag: $scope.taskTag || "",
        completed: false,
        pinned: false
    };

    $scope.tasks.push(newTask);

    localStorage.setItem(
        "tasks",
        JSON.stringify($scope.tasks)
    );

    // Clear input fields after successful add
    $scope.taskTitle="";
    $scope.taskPriority="";
    $scope.taskTag="";
};

$scope.deleteTask=function(index)
{
    $scope.tasks.splice(index,1);

    localStorage.setItem(
        "tasks",
        JSON.stringify($scope.tasks)
    );
};

    $scope.saveTasks=function()
    {
        localStorage.setItem(
            "tasks",
            JSON.stringify($scope.tasks)
        );
    };
    
    $scope.saveTask=function(task)
    {
        task.title=task.editTitle;
        task.priority=task.editPriority;
        task.tag=task.editTag;
        task.isEditing=false;
        localStorage.setItem(
    "tasks",
    JSON.stringify($scope.tasks)
);
    };
    $scope.togglePinTask=function(task)
{
    var index=$scope.tasks.indexOf(task);

    if(task.pinned)
    {
        task.pinned=false;
    }
    else
    {
        task.pinned=true;

        $scope.tasks.splice(index,1);
        $scope.tasks.unshift(task);
    }

    localStorage.setItem(
        "tasks",
        JSON.stringify($scope.tasks)
    );
};

});


    app.controller("SearchCtrl",
    function($scope,NoteService,TaskService)
    {
    $scope.notes=NoteService.notes;
    $scope.tasks=TaskService.tasks;
    });

app.controller("NavCtrl", function($scope, $location) {
    $scope.currentPath = function() {
        return $location.path();
    };
});
