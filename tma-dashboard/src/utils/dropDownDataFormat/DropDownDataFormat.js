function DropDownDataFormat(){

    function convertMetrics(originalMetrics, setMetricsFunc){
        let formattedMetrics = []
        for(var metric of originalMetrics){
            let metricTemp = {
                key: metric["metricId"].toString(),
                value: metric["metricId"].toString(),
                text:  "[id = " + metric["metricId"].toString() 
                    + "] " + metric["metricName"]
            }
            formattedMetrics.push(metricTemp)
        }
        setMetricsFunc(formattedMetrics)
    }

    function convertDescriptions(originalDescriptions, setDescriptionsFunc){
        let formattedDescriptions = []
        for(var description of originalDescriptions){
            let descriptionTemp = {
                key: description["descriptionId"].toString(),
                value: description["descriptionId"].toString(),
                text:  "[id = " + description["descriptionId"].toString() 
                + "] " + description["descriptionName"] + " (" + description["unit"] + ")"
            }
            formattedDescriptions.push(descriptionTemp)
        }
        setDescriptionsFunc(formattedDescriptions)
    }

    function convertResources(originalResources, setResourcesFunc){
        let formattedResources = []
        for(var resource of originalResources){
            let resourceTemp = {
                key: resource["resourceId"].toString(),
                value: resource["resourceId"].toString(),
                text:  "[id = " + resource["resourceId"].toString() 
                + "] " + resource["resourceName"] + " (" + resource["resourceAddress"] + ")"
            }
            formattedResources.push(resourceTemp)
        }
        setResourcesFunc(formattedResources)
    }

    return{convertMetrics,convertDescriptions,convertResources}
}

export default DropDownDataFormat;