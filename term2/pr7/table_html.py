def table(content):
    result = "<table>\n" + content + "</table>\n"
    return result

def tbody(content):
    result = "<tbody>\n" + content + "</tbody>\n"
    return result

def tr(content):
    result = "<tr>\n" + content + "</tr>\n"
    return result

def th(content):
    result = "<th>\n" + content + "</th>\n"
    return result

def td(content):
    result = "<td>\n" + content + "</td>\n"
    return result


tabletxt = open("table.txt", 'r')
tablehtml = open("table.html", 'w')

tablelog = tabletxt.read()


tablelist = tablelog.split("\n")
for index, item in enumerate(tablelist):
    tablelist[index] = item.split("\t")
    index += 1
    
    
result = ""
for y, row in enumerate(tablelist):
    tmp = ""
    print(y)
    if (y == 0):
        for x, item in enumerate(row):
            tmp += th(item)
            x += 1
        tmp = tr(tmp)
        y += 1
        result += tmp
        continue
    else:
        for x, item in enumerate(row):
            tmp += td(item)
            x += 1
        tmp = tr(tmp)
        y += 1
        result += tmp
result = tbody(result)
result = table(result)

tablehtml.write(result)

tabletxt.close()
tablehtml.close()
