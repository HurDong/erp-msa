import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { MoreHorizontal } from "lucide-react"

export function ProductList() {
  const products = [
    {
      id: 1,
      name: "Wireless Mouse",
      sku: "SKU-1234",
      category: "Electronics",
      stock: 145,
      price: "$29.99",
      status: "in-stock",
    },
    {
      id: 2,
      name: "Office Chair",
      sku: "SKU-2345",
      category: "Furniture",
      stock: 8,
      price: "$299.99",
      status: "low-stock",
    },
    {
      id: 3,
      name: "Laptop Stand",
      sku: "SKU-3456",
      category: "Accessories",
      stock: 12,
      price: "$49.99",
      status: "low-stock",
    },
    {
      id: 4,
      name: "USB-C Cable",
      sku: "SKU-4567",
      category: "Electronics",
      stock: 0,
      price: "$12.99",
      status: "out-of-stock",
    },
    {
      id: 5,
      name: 'Monitor 27"',
      sku: "SKU-5678",
      category: "Electronics",
      stock: 67,
      price: "$349.99",
      status: "in-stock",
    },
    {
      id: 6,
      name: "Desk Lamp",
      sku: "SKU-6789",
      category: "Lighting",
      stock: 89,
      price: "$39.99",
      status: "in-stock",
    },
  ]

  const getStatusVariant = (status: string) => {
    switch (status) {
      case "in-stock":
        return "default"
      case "low-stock":
        return "secondary"
      case "out-of-stock":
        return "destructive"
      default:
        return "default"
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "in-stock":
        return "In Stock"
      case "low-stock":
        return "Low Stock"
      case "out-of-stock":
        return "Out of Stock"
      default:
        return status
    }
  }

  return (
    <Card>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Product</TableHead>
              <TableHead>Category</TableHead>
              <TableHead className="text-center">Stock</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id}>
                <TableCell>
                  <div>
                    <div className="font-medium">{product.name}</div>
                    <div className="text-sm text-muted-foreground">{product.sku}</div>
                  </div>
                </TableCell>
                <TableCell>{product.category}</TableCell>
                <TableCell className="text-center font-medium">{product.stock}</TableCell>
                <TableCell className="font-medium">{product.price}</TableCell>
                <TableCell>
                  <Badge variant={getStatusVariant(product.status)}>{getStatusLabel(product.status)}</Badge>
                </TableCell>
                <TableCell>
                  <Button variant="ghost" size="icon">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
