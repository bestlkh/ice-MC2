import os
from svgpathtools import svg2paths

ls = [x[0] for x in os.walk('./')]
ls = ls[2:]

index = 2;
print("{")
for folder in ls:
    dir_name = folder[2:]
    for file in os.listdir(folder):
        filepath = folder + "/" + file
        filename = dir_name + "_" + file[:-4]
        
        paths, attributes = svg2paths(filepath);
        xmin, xmax, ymin, ymax = paths[0].bbox()
        width, height = [round(xmax-xmin), round(ymax-ymin)]
        #print("    " + filename + ": " + str(index) + ",")
        #index+=1
        #print("    \'" + filename + "\': [\'" +  attributes[0]['d'] + "\', " + str(width) + ", " + str(height) + "],")
        print("data[SvgEditorSymbols." + filename + "] = " + "{\'d\': \'" +  attributes[0]['d'] + "\', \'width\': " + str(width) + ", \'height\': " + str(height) + "};")
print("}")