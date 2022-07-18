package text

import ("example/server/text/portal")

// Hello returns a greeting for the named person.
func DispatchLogic(name string) string {
    // Return a greeting that embeds the name in a message.
    if(name=="seller"){
        return portal.HelloSeller(name)
    }
    return portal.HelloNormal(name)
}