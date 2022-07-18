export const scenariooptions=[
  {
    name:"scenarioname",
    label:"Scenario name",
    placeholder:"EX: Scenario 1"
  },
  {
    name:"duration",
    label:"Total duration",
    placeholder:"EX: 5 (-1 for infinite)"
  },
  {
    name:"workers",
    label:"Number of workers",
    placeholder:"EX: 4"
  },
  {
    name:"totalclients",
    label:"Number of client",
    placeholder:"EX: 10"
  },
  {
    name:"throttling",
    label:"Throttling per request in bps",
    placeholder:"EX: 50000 (-1 for no throttling)"
  },
  {
    name:"delay",
    label:"Delay between requests",
    placeholder:"EX: 0.5 - 1.3"
  },
]
export const requestoptions=[
  {
    name:"requestName",
    label:"Request Name",
    placeholder:"EX: get all projects"
  },
  {
    name:"host",
    label:"Host",
    placeholder:"EX: www.example.com"
  },
  {
    name:"port",
    label:"Port",
    placeholder:"EX: 80 or 443"
  },
  {
    name:"path",
    label:"Path",
    placeholder:"EX: /"
  },
  {
    name:"method",
    label:"Method",
    placeholder:"EX: GET",
    selectOptions:[
      {
        name:"GET",
        value:"GET"
      },
      {
        name:"POST",
        value:"POST"
      },
      {
        name:"PUT",
        value:"PUT"
      },
      {
        name:"PATCH",
        value:"PATCH"
      },
      {
        name:"DELETE",
        value:"DELETE"
      }
    ]
  }
]