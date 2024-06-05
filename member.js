function skillsMember()
{
    var member = {
        name: "Derek",
        skills: ["JavaScript", "TypeScript", "C#", "Node.js", "React", "Vue", "Angular", "HTML", "CSS", "SQL"],
        showSkills: function() {
            member.skills.forEach(function(skill) {
                console.log(skill);
            });
        }
    };
    return member;
}
